<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


// przyjmuje ssid, sprawdza czy jest już gra z takim zawodnikiem

// gracz był już w grze? status: wszystkie poza in_lobby
// czy gra jest zakończona? -> czy jest created? / czy jest in_progress? -> przywróć grę
// jest zakończona? znajdź nowe lobby

//Bajo jajo bajo jajo ()()()()()


// tutaj nie wiem trzeba zacząć mechanizm sesji czy coś
if($_SERVER['REQUEST_METHOD'] === 'GET')
{
    $response = ["player_id"=>NULL, "game"=> NULL ,"player_color"=> NULL];   
    session_start();

    if(isset($_SESSION['player_id']) && isset($_SESSION['player_color']))
    {

        $rooms_db = new DB("rooms");
        $players_db = new DB("players");
        $game = NULL;
        
        $player_id = $_SESSION['player_id'];
        $player_colro = $_SESSION['player_color'];
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
        $response = ["player_id"=>$player_id, "game"=> $current_game ,"player_color"=> $player_color];
        
    }
    echo json_encode($response); // zwróci albo grę albo NULL
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_id'])){
    $rooms_db = new DB("rooms");
    $players_db = new DB("players");
    
    $player_id = $_POST['player_id'];
    $rooms = $rooms_db->_get_all();
    $game = NULL;

    foreach ($rooms as $roomKey => $room) {
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