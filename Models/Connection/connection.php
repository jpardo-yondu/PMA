<?php
    error_reporting(E_ERROR);
    $dbname = "pma";
    $user = "root";
    $pass = "";
        
    require_once '../../Models/Main/jsonEncode.php';
    require_once '../../Models/Main/PostMethod.php';
    require_once '../../Models/Main/GetMethod.php';
    date_default_timezone_set('Asia/Manila');
    $dsn = "mysql:host=".$host.";dbname=".$dbname.";charset=utf8mb4";
    $options = [
        PDO::ATTR_EMULATE_PREPARES => false, 
        // turn off emulation mode for "real" prepared statements
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
        //turn on errors in the form of exceptions
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
        //make the default fetch be an associative array
    ];
    try {
        $db = new PDO($dsn, $user, $pass, $options);
    } 
    catch (Exception $e) {
        echo $e;
        die();
    }
?>