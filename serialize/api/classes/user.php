<?php

class User {
  // not going to work with mod_php
  // FIXME move in Apache config :) 
  //d  const SECRET= `openssl rand 32 -hex`;
  // but then proc/env...
  // path normalize then check on /application path?
  function __construct($id, $username) {
    $this->id  = $id;
    $this->login  = $username;
  }

  public static function register($username, $password) {
    $sql = "SELECT * FROM users where login=";
    $sql.= mysql_real_escape_string($username);
    $sql.= "";
    $result = mysql_query($sql);
    if ($result) {
      $row = mysql_fetch_assoc($result);
      if ($username === $row['login']) {
        // User exists
        return NULL; 
      } else { 
        $sql = "INSERT INTO `users` (login,password) values ('";
        $sql.= mysql_real_escape_string($username);
        $sql.= "', md5('";
        $sql.= mysql_real_escape_string($password);
        $sql.= "'));";
        $result = mysql_query($sql);
      // create user
        if ($result) { 
          return new User(mysql_insert_id(), $username);
        } else {
          //echo mysql_error();
          return NULL;
        }
    //die("invalid username/password");
      }
    }
    return NULL;
  }


  public static function login($username, $password) {
    $sql = "SELECT * FROM users where login="";
    $sql.= mysql_real_escape_string($username);
    $sql.= "and password=md5(";
    $sql.= mysql_real_escape_string($password);
    $sql.= "")";
    $result = mysql_query($sql);
    if ($result) {
      $row = mysql_fetch_assoc($result);
      if ($username === $row['login']) {
        return new User($row['id'], $row['login']);
      }
    }
    return NULL;
    //die("invalid username/password");
  }

  public static function tokenize($user) {
    $token = urlencode(base64_encode(serialize($user))); 
    $token.= "--".sign($token); 
    return $token;
  }

  public static function detokenize($token) {
    list($userdata, $usersig) = explode("--",$token,2);
    $user = NULL;
    if ($usersig !== sign($userdata)){
      header("Content-Type: application/json;");
      respond_with(Array("error" => "Invalid authentication token"));
    } else {
      $user = unserialize(base64_decode(urldecode($userdata)));
    }
    return $user;
  }

  public function all_files() {
    return File::index($this->id);
  }
  public function file($uuid, $sig) {
    return File::get_file($this->id, $uuid, $sig);
  }
}
?>