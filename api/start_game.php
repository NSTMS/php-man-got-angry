<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";
require_once "./classes/Timer.php";

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

        Timer::setInterval(function() use ($game_id, $rooms_db, $players_db){
            $room = $rooms_db->_get_by(['game_id','=',$game_id])[0];
            if(!is_null($room))
            {
                $room['time_left_for_move'] = $room['time_left_for_move'] - 1;
                $rooms_db->_update_data($room);

                if($room['time_left_for_move'] <= 0)
                {
                    $player = $players_db->_get_by(['player_id', '=',$room['player_on_move']])[0];
                    $player['player_status'] = "in_game_waiting";
                    $players_db->_update_data($player);
                    $ind = array_search($room['player_on_move'], $room['game_players_id']) + 1;
                    if($ind > count($room['game_players_id']) -1 ){
                        $ind = 0;
                    }
                    $room['player_on_move'] = $room['game_players_id'][$ind];
                    $player = $players_db->_get_by(['player_id', '=',$room['player_on_move']])[0];
                    $player['player_status'] = "in_game_moving";
                    $players_db->_update_data($player);
                    $room['time_left_for_move'] = 60;
                    $rooms_db->_update_data($room);
                }
            }
        }, 1000, $game_id);
        
        echo "game started succesfully!";

    }
    
}
