"<?php
 /*
 * GET  -> doc
 * POST -> action
 *  methods:
 *    - /login                    (user,password)       -> token
 *    - /register                 (user,password)       -> token
 *    - /files                    (token)               -> files
 *    - /file                     (token, uuid, sig)    -> file
 *    - /upload                   (token, file)         -> ok 
 */

require('router.php');
?> 