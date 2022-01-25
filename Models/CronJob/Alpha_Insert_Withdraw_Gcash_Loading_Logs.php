<?php
	require '../../Models/Connection/connection.php';
	
	try{
	    $db->beginTransaction();

	    $date = date("Y-m-d");
	    $time = date("H:i");
	    $From = date("Y-m-d") . " " . date("H") . ":00:00";
	    $To = date("Y-m-d") . " " . date("H") . ":59:59";
	    $db = 1;

	    $result = $db->prepare("SELECT SUM(`amount`) AS `amount` FROM `pitmasters`.`gcash_logs` WHERE `created_at` BETWEEN :From AND :To AND `api` = 'https://access.mynt.xyz/xapi/2.0/partner-cashin/confirm'AND `trans_ext_reference` IS NOT NULL"); 
	    $result->execute([":From" => $From, ":To" => $To]);
		$row = $result->fetch();
		$gcash = $row["amount"];

		$result = $db->prepare("SELECT SUM(`amount`) AS `amount` FROM `pitmasters`.`loading_logs` WHERE `created_at` BETWEEN :From AND :To AND `transaction_type` = 'withdrawal'AND `gcash_log_id` != '1'AND `gcash_log_id` IS NOT NULL AND `details` != 'Withdraw Returned due to Gcash Query Error' AND `load_to` != '78'"); 
		$result->execute([":From" => $From, ":To" => $To]);
		$row = $result->fetch();
		$loading = $row["amount"];

	    $result = $db->prepare("SELECT `id` FROM `wallet` WHERE `db` = :DB AND `type` = :Type AND `date` = :Date AND `time` =:Time");
	    $result->execute([":db" => $db, ":date" => $date, ":time" => $time, ":Type" => "Withdraw");

	    if ($row = $result->fetch()) {
	    	$id = $row["id"];

	    	$result = $db->prepare("UPDATE `wallet` SET `gcash_logs`= :Gcash,`loading_logs`= :Loading WHERE `db` = :DB AND `type` = :Type AND `date` = :Date AND `time` =:Time");
	    	$result->execute([":DB" => $db, ":Type" => "Withdraw", ":Date" => $date, ":Time" => $time, ":Gcash" => $gcash, ":Loading" => $loading]);


	    }else{
	    	$result = $db->prepare("INSERT INTO `wallet`(`db`, `type`, `date`, `time`, `gcash_logs`, `loading_logs`) VALUES (:DB, :Type, :Date, :Time, :Gcash, :Loading)");
	    	$result->execute([":DB" => $db, ":Type" => "Withdraw", ":Date" => $date, ":Time" => $time, ":Gcash" => $gcash, ":Loading" => $loading]);
	    }

	    $db->commit();
	}
	catch(Exception $e){
		console.log("there has an error in Updating Withdraw Gcash/Loading Logs: " . $e);
	    $db->rollBack();
	}

?>