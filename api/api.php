<?php
require_once "./SleekDB/src/Store.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$databaseDirectory = __DIR__ . "/db";
$newsStore = new \SleekDB\Store("news", $databaseDirectory);
$article = [
    "title" => "Google Pixel XL",
];
// $newsStore->insert($article);
$allNews = $newsStore->findAll();

echo json_encode($allNews);
