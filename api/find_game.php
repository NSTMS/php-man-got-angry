<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


// przyjmuje ssid, sprawdza czy jest już gra z takim zawodnikiem

// gracz był już w grze? status: wszystkie poza in_lobby
// czy gra jest zakończona? -> czy jest created? / czy jest in_progress? -> przywróć grę
// jest zakończona? znajdź nowe lobby

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['session_id'])){

    $rooms_db = new DB("rooms");
    $players_db = new DB("players");
    
    $response = NULL;
    
    session_id($_POST['session_id']);
    session_start();

    if(isset($_SESSION['player_id']) && !is_null($_SESSION['player_id']))
    {

        $player_id = $_SESSION['player_id'];
        $player_color = NULL;
        $game = NULL;

        $pl = $players_db->_get_by(["player_id","=",$player_id]);

        if(!is_null($pl) && count($pl) == 1)
        {   
            $player_color = $pl[0]['player_color'];
        }
    
        $rooms = $rooms_db->_get_all();

        foreach ($rooms as $roomKey => $room) {
            foreach ($room['game_players_id'] as $playerKey => $player) {
                if($player == $player_id){
                    $game = $room;
                    break; 
                }
            }
            if($game != NULL) break;
        }
        if(!is_null($game))
        {
            $_SESSSION['game_id'] = $game['game_id'];
            $_SESSSION['player_color'] = $player_color; 
            $response = ["player_id"=>$player_id, "game"=> $game ,"player_color"=> $player_color];
        }
    }

    echo json_encode($response); // zwróci albo grę albo NULL

}