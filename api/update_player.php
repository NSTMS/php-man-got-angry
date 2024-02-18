<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$players_db = new DB("players");

// nie wiem wsm co tutaj ma się dziać   

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_id']) && isset($_POST['property']) && isset($_POST['value'])){
    $property = $_POST['property'];
    $value = $_POST['value'];
    $player_id = $_POST['player_id'];
    $player=$players_db->_get_by(['player_id','=',$player_id])[0];
    if(!is_null($player))
    {
        $players_db->_update($player['_id'], [$property=>$value]);
    }
    $player=$players_db->_get_by(['player_id','=',$player_id])[0];
    echo json_encode($player);
}

