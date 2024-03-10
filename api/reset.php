<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$players_db = new DB("players");
$rooms_db = new DB("rooms");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $players_db->_delete_by(["player_status","!=","s"]);
    $rooms_db->_delete_by(["game_status","!=","s"]);
}

