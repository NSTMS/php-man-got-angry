<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db = new DB("players");
// $db->_insert(["name"=> "testowy", "session_id"=> 12345, "color"=>"red"]);
// $db->_delete_by(["name","=","testowy"]);
$players = $db->_get_all();

echo json_encode($players);
