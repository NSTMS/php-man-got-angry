<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$rooms_db = new DB("rooms");
$player_db = new DB('players');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id']) && isset($_POST['players_pawns']) && isset($_POST["player_id"])){
    $game_id = $_POST['game_id'];
    $player_id = $_POST['player_id'];
    $players_pawns = json_decode($_POST['players_pawns']);

    $games = $rooms_db->_get_by(["game_id", "=", $game_id]);
    $players = $player_db->_get_by(['player_id',"=",$player_id]);
    $new_game = NULL;
    $player = NULL;

    if(count($games) > 0 && count($players) > 0){
        $new_game = $games[0];
        $player = $players[0];

        $new_game['players_pawns'] =  $players_pawns;
        $ind = array_search($player_id, $new_game['game_players_id']) + 1;
        if($ind > count($new_game['game_players_id']) -1 ){
            $ind = 0;
        }
        $new_game['player_on_move'] = $new_game['game_players_id'][$ind];     
        $player['player_status'] = "in_game_waiting";
        $new_game['has_moved'] = false;
        $next_player = $player_db->_get_by(['player_id',"=",$new_game['game_players_id'][$ind]])[0];
        $next_player['player_status'] = "in_game_moving";
        $player_db->_update_data($next_player);
        $player_db->_update_data($player);  
        $rooms_db->_update_data($new_game);
    }
    echo json_encode($new_game['players_pawns']);
    
}