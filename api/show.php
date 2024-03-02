<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$players_db = new DB("players");
$rooms_db = new DB("rooms");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){

    $players_counter = $players_db->_count();
    echo "players: $players_counter";
    $rooms_counter = $rooms_db->_count();
    echo "rooms: $rooms_counter";
    $rooms = $rooms_db->_get_all();
    $players = $players_db->_get_all();
    echo "<br>players: <br>";    
    echo json_encode($players);    
    echo "<br> rooms: <br>";    
    echo json_encode($rooms);    
}