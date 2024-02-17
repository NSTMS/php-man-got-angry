<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


// przyjmuje ssid, sprawdza czy jest już gra z takim zawodnikiem

// gracz był już w grze? status: wszystkie poza in_lobby
// czy gra jest zakończona? -> czy jest created? / czy jest in_progress? -> przywróć grę
// jest zakończona? znajdź nowe lobby


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_id'])){
    $rooms_db = new DB("rooms");
    $players_db = new DB("players");
    
    $player_id = $_POST['player_id'];
    $rooms = $rooms_db->_get_all();
    $game = NULL;

    foreach ($rooms as $roomKey => $room) {
        if($room['game_status'] == "finished") continue;
        foreach ($room['game_players_id'] as $playerKey => $player) {
            if($player == $player_id){
                $game = $room;
                break; 
            }
        }
        if($game != NULL) break;
    }


    // if($game != NULL && $game['game_status'] == "finished")
    // {
    //     $player = $players_db->_get_by(["player_id"=>$player_id]);
    //     $players_db->update($player['_id'], ["player_game_id"=> NULL]); // ustawiam, że gracz nie jest już w żadnej grze
    //     $game = NULL;
    // }
    echo json_encode($game); // zwróci albo grę albo NULL
}


$test_game = [
    "213234234" => [ # game_id
        "game_players_id" => ["123131", "323425"], // players_id
        "game_status" => "in_progress", 
        "game_state" => "BB---A----S----S-------AA-SS", // tutaj zawartość planszy
        "time_left_for_move" => 60 # w sekundach
    ]
];

$test_players = [
    "123131" => [ # player_id
        "player_name" => "testowy",
        "player_game_id"=>"213234234",
        "player_status" => "in_game_moving"
    ],
    "323425" => [ # player_id
        "player_name" => "testowy-2",
        "player_game_id" => "213234234",
        "player_status" => "in_game_waiting"
    ]
];