<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$rooms_db = new DB("rooms");
$player_db = new DB('players');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id']) && isset($_POST['has_moved'])){

    $game_id = $_POST['game_id'];
    $has_thrown = $_POST['has_moved'];

    $games = $rooms_db->_get_by(["game_id", "=", $game_id]);
    $game = NULL;

    if(count($games) > 0){
        $game = $games[0];
        $game['has_moved'] = $has_thrown;
        $rooms_db->_update_data($game);
    }
    echo json_encode(["has_thrown_dice"=>$game['has_thrown_dice']]);

}
