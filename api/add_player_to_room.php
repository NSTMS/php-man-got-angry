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
    $rooms = $rooms_db->_get_by(["game_status","=","created"]);
    $game = NULL;
    $potential_game_to_join = NULL; // pierwsza o liczbie graczy mniejszej niż 4
    $player_color = NULL;
    foreach ($rooms as $roomKey => $room) {
        if(count($room['game_players_id']) < 4)
        {
            $potential_game_to_join = $room;
            break;
        }
    }
    
    $player_id = "pl-".$players_db->_generate_uid();
    $game_id = NULL;
    $current_game = NULL;
    if(!is_null($potential_game_to_join))
    {
        array_push($potential_game_to_join['game_players_id'], $player_id);

        $rooms_db->_update($potential_game_to_join["_id"],["game_players_id"=>$potential_game_to_join['game_players_id']]);
        $game_id = $potential_game_to_join["game_id"];
        $player_color = array_shift($potential_game_to_join['available_player_colors']);
        $current_game = $potential_game_to_join;
    }
    else{
        $game_id = "rm-".$rooms_db->_generate_uid();
        $player_color = "red";
        $current_game = [
            "game_id"=>$game_id ,
            "game_players_id" => [$player_id],
            "game_status" => "created",
            "game_state" => "", // to jeszcze nie wiem dokońca
            "time_left_for_move" => 60,
            "available_player_colors" => ["blue","yellow","green"] // "blue","yellow","green" bo "red" już przypisane do pierwszego gracza
        ];
        $rooms_db->_insert($current_game);
    }

    $players_db->_insert([
        "player_id" =>  $player_id,
        "player_name" => $player_name,
        "player_status" => "in_lobby_not_ready",
        "player_game_id" =>$game_id,
        "player_color" => $player_color
    ]);

    $response = ["player_id"=>$player_id, "game"=> $current_game ,"player_color"=> $player_color];
    echo json_encode($response);
}