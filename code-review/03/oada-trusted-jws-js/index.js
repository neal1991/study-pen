/* Copyright 2019 Open Ag Data Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Promise = require('bluebird');
const request = Promise.promisifyAll(require('superagent'));
const jwku = Promise.promisifyAll(require('jwks-utils'));
const jws = require('jws');
const jwt = require('jsonwebtoken');
const jwk2pem = require('pem-jwk').jwk2pem;
const warn  = require('debug')('oada-trusted-jws:warn');
const info  = require('debug')('oada-trusted-jws:info');
const trace = require('debug')('oada-trusted-jws:trace');

var TRUSTED_LIST_URI = 'https://oada.github.io/oada-trusted-lists/client-registration-v2.json';

// callback <= (err, trusted, payload)
// options: {
//   timeout: 1000, // ms
//   trustedListCacheTime: 3600, // seconds
//   additionalTrustedListURIs: [ 'https://somewhere.com/client-registration.json' ],
// }

let trustedListCache = {};
const clearCache = function() {
  trustedListCache = {}; // Clear our cache of trusted lists
  jwku.clearJWKsCache(); // and clear the jwku library's cache of jwks sets
}                        // mainly useful for testing...

module.exports = function(sig, options, callback) {
  return Promise.try(() => {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    options = options || {};
    // Since 0 is a valid timeout, have to check whether it's actually a number instead of just truthy
    options.timeout = typeof options.timeout === 'number' ? options.timeout : 1000;
    // Default trusted list cached for one hour, in seconds
    options.trustedListCacheTime = typeof options.trustedListCacheTime === 'number' ? options.trustedListCacheTime : 3600; // seconds
    options.additionalTrustedListURIs = options.additionalTrustedListURIs || [];
    options.disableDefaultTrustedListURI = options.disableDefaultTrustedListURI || false;

    // Build the list of all the trusted lists we're going to check
    let trustedListURIs = options.disableDefaultTrustedListURI ? [] : [ TRUSTED_LIST_URI ];
    trace('additionalTrustedListURIs = ', options.additionalTrustedListURIs);
    trustedListURIs = trustedListURIs.concat(options.additionalTrustedListURIs);
    trace('Using trustedListURIs = ', trustedListURIs);

    //---------------------------------------------------------------------------
    // Loop over all the trusted list URI's, checking if we already have in cache
    // If in cache, also check that they are not stale and need to be replaced
    trace('Starting trusted lists cache check, trustedListCache = ', trustedListCache);
    const now = Date.now() / 1000; // convert ms to sec
    return Promise.map(trustedListURIs, listURI => {
      // either not cached, or cache is old
      if (!trustedListCache[listURI] || trustedListCache[listURI].timeLastFetched < (now - options.trustedListCacheTime)) { 
        trace('listURI ',listURI,' is not in cache or is stale, fetching...');
        return request.get(listURI)
         .timeout(options.timeout)
         .then(result => {
           const newCacheObj = {
             timeLastFetched: now,
             body: result.body,
             listURI,
           };
           trustedListCache[listURI] = newCacheObj;
           trace('Fetched list from URI ',listURI, ', putting this into the cache: ', newCacheObj);
           return newCacheObj;
         }).catch(err => {
           warn('WARNING: unable to fetch trusted list at URI.',listURI);
           return false;
         });
      }
      // else, we have it in the cache, so return the cached body directly
      trace('listURI ', listURI, ' is in cache, returning cached value: ', trustedListCache[listURI]);
      return Promise.resolve(trustedListCache[listURI]);
    });

  //-----------------------------------------------------------------------------
  // Now, look through all the lists to see if the jku on the signature is in any of the trusted lists
  }).then(lists => {
    trace('List caching section finished, lists = ', lists);
    // jws.decode throws if the signature is invalid
    try {
      var decoded = jws.decode(sig);
    } catch(err) {
      decoded = false;
    }
    if (!decoded || !decoded.header) {
      trace('decoded signature is null or has no header.');
      return { decoded: false, trusted: false, jwk: false };
    }
    trace('Tried decoding the signature, resulting in decoded = ', decoded);

    // Now look in the list for a jku or jwk that matches the one on this signature:
    const foundList = lists.reduce((alreadyFound,l) => {
      if (alreadyFound) return alreadyFound;
      // body example
      // {
      //   "version": "2",
      //   "comments": "Version 2 supports list of jku's in jkus key and a jwks key set",
      //   "jkus": [
      //     "https://identity.oada-dev.com/certs"
      //   ],
      //   "jwks": {
      //     "keys": [ ]
      //   }
      // }
      if (!l || !l.body) return false;
      if (l.body.version === "2") {
        // v2 trusted list: an object with a list of jku's and/or jwk's
        if (!l.body.jkus && !l.body.jwks) return false; // have neither jkus in trusted list nor jwks
        // Check jku list to see if we have a match in this header:
        let foundJKU = false;
        if (typeof l.body.jkus.find === 'function') {
          // If jkus is a list of strings of trusted URL's, see if it matches jku in header:
          foundJKU = l.body.jkus.find(i => (typeof i === 'string' && i.length > 0 && i === decoded.header.jku));
        }
        // Check jwks key set in trusted list if there is one
        let foundJWKInJWKS = false;
        if (jwku.isJWKset(l.body.jwks)) {
          // Search through the trusted JWKS set 
          if(jwku.findJWK(decoded.header.jwk && decoded.header.jwk.kid, l.body.jwks)) {
            foundJWKInJWKS = l.body.jwks; // keep the JWKS to use later in checking signature
          }
        }
        trace('Searched list '+l.listURI+' for jwk or jku from header, foundJKU = ', foundJKU, ', foundJWKInJWKS = ', foundJWKInJWKS);
        // returns either a JKU string, or a JWKS object
        return foundJKU || foundJWKInJWKS;
      }
      // v1 trusted list: an array of strings that are all jku's (no jwk's supported in trusted list)
      if (typeof l.body.find !== 'function') return false; // not an array
      return l.body.find(i => (i === decoded.header.jku)); // returns jku string
    // initial value of alreadyFound in reducer is false:
    }, false);
    if (!foundList) {
      info('header of decoded signature does not have a jku or jwk key that '
          +'exists in any of the trusted lists. decoded.header = ', decoded.header);
    }
    // foundList is now either a string (jku) or object (trusted jwks)
    trace('Result of search for jku or jwk that matches a trusted list entry = ', foundList);

    // If we found the jku from
    // the header in a trusted list, then the call below will tell jwkForSignatureAsync to 
    // use that jku, go there and get the list of keys, then use the kid to lookup the jwk.
    // If it was not found in a trusted list, then jwkForSignatureAsync will just return either
    // the jwk from the header directly or the corresponding jwk from a jku lookup
    return Promise.props({ 
      decoded,
      // IMPORTANT: !!foundList at this point does not know if the signature actually is valid and trusted,
      // it only knows that the signature pointed at something in a trusted list.  We don't really know if
      // it is trusted until we check both that the signature pointed at something in a trusted list, AND
      // the signature was signed with the private key of the trusted thing it pointed at.
      // Therefore, in the next .then() block when we call verify with the jwk from here, if it throws
      // then we know the signature couldn't be verified and will therefore be considered untrusted
      trusted: !!foundList,  // true/false whether trusted/not_trusted
      jwk: jwku.jwkForSignatureAsync(sig, !!foundList ? foundList : false, { timeout: options.timeout }),
    });

  // Now we can go ahead and verify the signature with the jwk:
  }).then(({ decoded, trusted, jwk }) => {
    if (!decoded) return [ false, false ];
    return [ trusted, jwt.verify(sig, jwk2pem(jwk)) ];
  }).catch(err => {
    info('jwku.jwkForSignatureAsync or jwt.verify threw an error, it was: ', err);
    return [false, false];
    // And signal the callback with any thrown errors, or (trusted, clientRegistration) if no errors
  }).nodeify(callback, { spread: true });

};

module.exports.TRUSTED_LIST_URI = TRUSTED_LIST_URI;
module.exports.clearCache = clearCache;
