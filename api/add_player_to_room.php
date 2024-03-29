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
        $game_id = $potential_game_to_join["game_id"];
        $player_color = array_shift($potential_game_to_join['available_player_colors']);
        $current_game = $potential_game_to_join;
 

        $rooms_db->_update($potential_game_to_join["_id"],
        [
            "game_players_id"=>$potential_game_to_join['game_players_id'],
            "available_player_colors"=>$potential_game_to_join['available_player_colors'],
        ]);
    
    }
    else{
        $game_id = "rm-".$rooms_db->_generate_uid();
        $player_color = "red";
        $current_game = [
            "game_id"=>$game_id ,
            "game_players_id" => [$player_id],
            "game_status" => "created",
            "has_moved" => false,
            "available_player_colors" => ["blue","yellow","green"], // "blue","yellow","green" bo "red" już przypisane do pierwszego gracza,
            "player_on_move" => $player_id, // id gracza który ma teraz ruch 
            "players_pawns" => [
                "red" => [
                    ["pawn_id" => 1, "pos" => 12, "color" => "red", "status" => "in_home"],
                    ["pawn_id" => 2, "pos" => 13, "color" => "red", "status" => "in_home"],
                    ["pawn_id" => 3, "pos" => 23, "color" => "red", "status" => "in_home"],
                    ["pawn_id" => 4, "pos" => 24, "color" => "red", "status" => "in_home"],
                ],
                "blue" => [
                    ["pawn_id" => 1, "pos" => 19, "color" => "blue", "status" => "in_home"],
                    ["pawn_id" => 2, "pos" => 20, "color" => "blue", "status" => "in_home"],
                    ["pawn_id" => 3, "pos" => 30, "color" => "blue", "status" => "in_home"],
                    ["pawn_id" => 4, "pos" => 31, "color" => "blue", "status" => "in_home"],
                ],
                "yellow" => [
                    ["pawn_id" => 1, "pos" => 89, "color" => "yellow", "status" => "in_home"],
                    ["pawn_id" => 2, "pos" => 90, "color" => "yellow", "status" => "in_home"],
                    ["pawn_id" => 3, "pos" => 100, "color" => "yellow", "status" => "in_home"],
                    ["pawn_id" => 4, "pos" => 101, "color" => "yellow", "status" => "in_home"],
                ],
                "green" => [
                    ["pawn_id" => 1, "pos" => 96, "color" => "green", "status" => "in_home"],
                    ["pawn_id" => 2, "pos" => 97, "color" => "green", "status" => "in_home"],
                    ["pawn_id" => 3, "pos" => 107, "color" => "green", "status" => "in_home"],
                    ["pawn_id" => 4, "pos" => 108, "color" => "green", "status" => "in_home"],
                ],
            ]
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

    session_start();
    $_SESSION['player_id'] = $player_id;
    $_SESSION['player_color'] = $player_color;
    $_SESSION['game'] = $current_game;

    $response = ["player_id"=>$player_id, "game"=> $current_game ,"player_color"=> $player_color, "session_id"=>session_id()];
    echo json_encode($response);
}