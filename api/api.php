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


    // $c_room = $rooms_db->_get_by(["game_id","=","rm-0hy-jrg-khd-vau"])[0];
    // $rooms_db->_update(39, ['game_status'=>'created']);
    // echo "<br>current room: <br>";    
    // echo json_encode($c_room);    

    
    $rooms = $rooms_db->_get_all();
    $players = $players_db->_get_all();
    echo "<br>players: <br>";    
    echo json_encode($players);    
    echo "<br> rooms: <br>";    
    echo json_encode($rooms);    

    $players_db->_delete_by(["player_status","=","in_lobby_ready"]);
    $players_db->_delete_by(["player_status","=","in_lobby_not_ready"]);
    $players_db->_delete_by(["player_status","=","in_game_moving"]);
    $players_db->_delete_by(["player_status","=","in_game_waiting"]);
    $rooms_db->_delete_by(["game_status","=","created"]);
    $rooms_db->_delete_by(["game_status","=","in_progress"]);

}

if ($_SERVER['REQUEST_METHOD'] === 'PUT_ME_INTO_COMA') {
    // $db->_insert(["name"=> "testowy", "session_id"=> 12345, "color"=>"red"]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $db->_delete_by(["name","=","testowy"]);
}



