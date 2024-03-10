<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$rooms_db = new DB("rooms");

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['session_id'])) {
    $session_id = $_POST['session_id'];
    session_id($session_id);
    session_start();
    $game_id = $_SESSION['game_id'];
    
    $games = $rooms_db->_get_by(["game_id", "=", $game_id]);
    if(count($games) > 0){
        $game = $games[0];
        if($game['player_on_move'] != $_SESSION['player_id']){
            echo json_encode(["status"=>"400", "error" => "Not your turn!"]);
            return;
        }
        else{
            $dice = rand(1, 6);
            echo json_encode(["status"=>"200", "dice_val" => $dice]);

        }
    }

}