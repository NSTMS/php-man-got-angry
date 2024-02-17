<?php
require_once "./SleekDB/src/Store.php";
require_once "./classes/DB.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$rooms_db = new DB("rooms");
$players_db = new DB("players");

// nie wiem wsm co tutaj ma się dziać   

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['player_name'])){

}

