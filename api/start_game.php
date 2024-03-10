<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$rooms_db = new DB("rooms");
$players_db = new DB("players");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id'])){
    $game_id = $_POST['game_id'];
    $room=$rooms_db->_get_by(['game_id','=',$game_id])[0];
    if(!is_null($room))
    {
        foreach ($room['game_players_id'] as $playerKey => $player_id) {
            $player = $players_db->_get_by(['player_id', '=',$player_id])[0];
            if(!is_null($player))
            {
                $status = "in_game_waiting";
                if($player['player_color'] == 'red'){
                    $status ="in_game_moving";
                }
                $players_db->_update($player['_id'], ['player_status'=>$status]);
            }            
        }
        $room['game_status'] = "in_progress";
        $rooms_db->_update_data($room);
        
        echo "game started succesfully!";

    }
    
}
