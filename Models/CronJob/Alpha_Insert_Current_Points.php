<?php
	require '../../Models/Connection/connection.php';
	
	try{
	    $db->beginTransaction();

	    $date = date("Y-m-d");
	    $time = date("H:i");
	    $db = 1;
	
		// Highest Current Points
	    $result = $db->prepare("SELECT `current_points`, CONCAT(`first_name`,' ', `last_name`) AS `Name` FROM `pitmasters`.`users` WHERE `id` != '78' ORDER BY `current_points` DESC LIMIT 1");
	    $result->execute();
	    $row = $result->fetch();
	    
	    $result = $db->prepare("INSERT INTO `user_details`(`db`, `date`, `time`, `fullname`, `amount`) VALUES (:db, :date, :time, :name, :amount);");
	    $result->execute([":db" => $db, ":date" => $date, ":time" => $time, ":name" => $row["Name"], ":amount" => $row["current_points"]]);

		// Lowest Current Points	    
	    $result = $db->prepare("SELECT `current_points`, CONCAT(`first_name`,' ', `last_name`) AS `Name` FROM `pitmasters`.`users` WHERE `id` != '78' ORDER BY `current_points` ASC LIMIT 1");
	    $result->execute();
	    $row = $result->fetch();

	     $result = $db->prepare("INSERT INTO `user_details`(`db`, `date`, `time`, `fullname`, `amount`) VALUES (:db, :date, :time, :name, :amount);");
	    $result->execute([":db" => $db, ":date" => $date, ":time" => $time, ":name" => $row["Name"], ":amount" => $row["current_points"]]);
	    
	    $db->commit();
	}
	catch(Exception $e){
		console.log("there has an error in Updating Current Points: " . $e);
	    $db->rollBack();
	}

?>