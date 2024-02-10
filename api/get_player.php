<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_id'])){
    $db = new DB("players");
    $player = $db->_get_by(["player_id", "=", $_POST['player_id']]);
    echo json_encode($player);    
}

