<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db = new DB("players");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $players = $db->_get_all();
    echo json_encode($players);    
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // $db->_insert(["name"=> "testowy", "session_id"=> 12345, "color"=>"red"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $db->_delete_by(["name","=","testowy"]);
}



