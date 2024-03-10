<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$rooms_db = new DB("rooms");
$player_db = new DB('players');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['players_pawns']) && isset($_POST["session_id"])){
    $session_id = $_POST['session_id'];
    session_id($session_id);
    session_start();

    $game_id = $_SESSION['game_id'];
    $player_id = $_SESSION['player_id'];

    $players_pawns = json_decode($_POST['players_pawns']);

    
    $players = $player_db->_get_by(['player_id',"=",$player_id]);
    $games = $rooms_db->_get_by(["game_id", "=", $game_id]);
    $player = NULL;
    $new_game = NULL;
    
    if(count($games) > 0 && count($players) > 0){
        $new_game = $games[0];
        $player = $players[0];

        $new_game['players_pawns'] =  $players_pawns;
        $ind = array_search($player_id, $new_game['game_players_id']) + 1;
        if($ind > count($new_game['game_players_id']) -1 ){
            $ind = 0;
        }
        $new_game['player_on_move'] = $new_game['game_players_id'][$ind];     
        $new_game['player_color'] = $new_game['available_player_colors'][$ind];
        $rooms_db->_update_data($new_game);
        $player['player_status'] = "in_game_waiting";
        $player_db->_update_data($player);
        $next_player = $player_db->_get_by(['player_id',"=",$new_game['player_on_move']])[0];
        $next_player['player_status'] = "in_game_moving";
        $player_db->_update_data($next_player);
    }
    echo json_encode($new_game['players_pawns']);
    
}