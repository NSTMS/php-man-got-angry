<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$rooms_db = new DB("rooms");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id']) && isset($_POST['players_pawns'])){
    $game_id = $_POST['game_id'];
    $players_pawns = json_decode($_POST['players_pawns']);

    $games = $rooms_db->_get_by(["game_id", "=", $game_id]);
    $new_game = NULL;
    if(count($games) > 0){
        $new_game = $games[0];
        $new_game['players_pawns'] =  $players_pawns;
        $rooms_db->_update_data($new_game);
    }
    echo json_encode($new_game['players_pawns']);
    
}