<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id'])){
    $rooms_db = new DB("rooms");
    $players_db = new DB("players");
    $players = [];
    $room = $rooms_db->_get_by(["game_id", "=", $_POST['game_id']])[0];

    foreach($room['game_players_id'] as $playerKey => $player_id)
    {
        $player = $players_db->_get_by(["player_id","=",$player_id])[0];
        array_push($players,$player);
    }

    echo json_encode($players);    
}

