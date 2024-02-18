<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['game_id'])){
    $db = new DB("rooms");
    $game = $db->_get_by(["game_id", "=", $_POST['game_id']]);
    echo json_encode($game[0]);    
}

