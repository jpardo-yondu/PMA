<?php
    error_reporting(E_ERROR);
    session_start();
	$time = $_SERVER['REQUEST_TIME'];

	$session_timeout = 3600;

    if(!empty($_SESSION["ORAS"]["ORAS"]) && $_SESSION["ORAS"]["ORAS"] == 'true')
	if (($_SESSION["ORAS"]['ORAS_LAST_ACTIVITY'] != null) && 
	   ($time - $_SESSION["ORAS"]['ORAS_LAST_ACTIVITY']) > $session_timeout) {
	    echo '<script>alert("440: SESSION EXPIRED - For your security, Your account has been log out as there was no activity for more than 1 hour. "); </script>';
	    session_start();
	    unset($_SESSION['ORAS']);
	    require_once '../../View/Account/LogOut.php';
	}

	$_SESSION["ORAS"]['ORAS_LAST_ACTIVITY'] = $time;
	
?>