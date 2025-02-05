<?php
require_once('classes/db.php');
require_once('classes/utils.php');
require_once('classes/user.php');
require_once('classes/file.php');
if (($_SERVER['REQUEST_METHOD'] === 'GET') ||
    ($_SERVER['REQUEST_METHOD'] === 'HEAD')
) {
    require_once('views/header.php');
    require_once('views/documentation.php');
    require_once('views/footer.php');
} else {
    if ($_SERVER["CONTENT_TYPE"] === "application/json") {
        $data = (array) json_decode(file_get_contents('php://input'));
        if (isset($data['token'])) {
            $token = $data['token'];
        }
        if (isset($data['uuid'])) {
            $uuid = $data['uuid'];
        }
        if (isset($data['sig'])) {
            $sig = $data['sig'];
        }
        if (isset($data['username'])) {
            $username = $data['username'];
        }
        if (isset($data['password'])) {
            $password = $data['password'];
        }
        if (isset($data['filename'])) {
            $filename = $data['filename'];
        }
        if (isset($data['content'])) {
            $content = $data['content'];
        }
    } else {
        respond_with(array("error" => "API only accepts json"));
    }
    $user = NULL;
    if (isset($token)) {
        $user = User::detokenize($token);
    }
    if ($_GET['action'] === "register") {
        // login
        if (isset($username) && isset($password)) {
            $user = User::register($username, $password);
            if ($user) {
                respond_with(array("token" => User::tokenize($user)));
            }
        }
        respond_with(array("error" => "Invalid or missing credentials"));
    } elseif ($_GET['action'] === "login") {
        // login
        if (isset($username) && isset($password)) {
            $user = User::login($username, $password);
            if ($user) {
                respond_with(array("token" => User::tokenize($user)));
            }
        }
        respond_with(array("error" => "Invalid or missing credentials"));
    } elseif ($_GET['action'] === "files") {
        if ($user !== NULL) {
            respond_with(array("files" => $user->all_files()));
        }
        respond_with(array("error" => "Authorisation fail"));
        // all files
    } elseif ($_GET['action'] === "file") {
        if ($user !== NULL) {
            $file = $user->file($uuid, $sig);
            respond_with(array("file" => $file));
        }
        respond_with(array("error" => "Authorisation fail"));
        // file details

    } elseif ($_GET['action'] === "upload") {
        if ($user !== NULL) {
            File::upload($filename, $content, $user->id);
        }
        respond_with(array("error" => "Authorisation fail"));
    } else {
        // ERROR
        respond_with(array("error" => "Invalid action"));
    }
}
