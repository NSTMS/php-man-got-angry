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
    echo "players: $rooms_counter";
    
    $players_db->_delete_by(["player_status","=","in_lobby_not_ready"]);
    $rooms_db->_delete_by(["game_status","=","created"]);

    $rooms = $rooms_db->_get_all();
    $players = $players_db->_get_all();
    echo "<br>players: <br>";    
    echo json_encode($players);    
    echo "<br> rooms: <br>";    
    echo json_encode($rooms);    



}

if ($_SERVER['REQUEST_METHOD'] === 'PUT_ME_INTO_COMA') {
    // $db->_insert(["name"=> "testowy", "session_id"=> 12345, "color"=>"red"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $db->_delete_by(["name","=","testowy"]);
}



