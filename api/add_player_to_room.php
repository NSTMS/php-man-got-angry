<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$rooms_db = new DB("rooms");
$players_db = new DB("players");
// znajdź grę created / stwórz nową grę i czekaj na graczy



if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_name'])){

    $player_name = $_POST['player_name'];
    $rooms = $rooms_db->_get_all();
    $game = NULL;
    $potential_game_to_join = NULL; // pierwsza o statusie created i liczbie graczy mniejszej niż 4

    foreach ($rooms as $roomKey => $room) {
        if($room['game_status'] == "created" && count($room['game_players_id']) < 4)
        {
            $potential_game_to_join = $room;
            break;
        }
    }
    
    $player_id = "pl-".$players_db->_generate_uid();
    $game_id = NULL;
    $current_game =NULL;
    if(!is_null($potential_game_to_join))
    {
        array_push($potential_game_to_join['game_players_id'], $player_id);

        $rooms_db->_update($potential_game_to_join["_id"],["game_players_id"=>$potential_game_to_join['game_players_id']]);
        $game_id = $potential_game_to_join["game_id"];
        $current_game = $potential_game_to_join;
    }
    else{
        $game_id = "rm-".$rooms_db->_generate_uid();
        $current_game = [
            "game_id"=>$game_id ,
            "game_players_id" => [$player_id],
            "game_status" => "created",
            "game_state" => "", // to jeszcze nie wiem dokońca
            "time_left_for_move" => 60 
        ];
        $rooms_db->_insert($current_game);
    }

    $players_db->_insert([
        "player_id" =>  $player_id,
        "player_name" => $player_name,
        "player_status" => "in_lobby_not_ready",
        "player_game_id" =>$game_id
    ]);

    $response = ["player_id"=>$player_id, "game"=> $current_game];
    echo json_encode($response);
}