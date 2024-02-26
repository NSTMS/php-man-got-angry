<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sesssion_id'])){
    
    session_id($_POST['sesssion_id']);
    session_start();

    echo json_encode($_SESSION);
}


// w sesji przechowuję:
// - player_id
// - player_color
// - game