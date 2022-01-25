<?php
	require '../../Models/Connection/connection.php';
	
	try{
	    $db->beginTransaction();

	    $date = date("Y-m-d");
	    $time = date("H:i");
	    $From = date("Y-m-d") . " " . date("H") . ":00:00";
	    $To = date("Y-m-d") . " " . date("H") . ":59:59";
	    $db = 1;

       	$response = '{"result":{"resultCode":"SUCCESS","resultStatus":"S","resultMessage":"success"}}';

	    $result = $db->prepare("SELECT SUM(`amount`) AS `sum` FROM `pitmasters`.`gcash_logs` WHERE `created_at` BETWEEN :FromDate AND :ToDate AND JSON_EXTRACT(`request` , '$.paymentStatus') = 'SUCCESS'AND `response` = :Response AND `api` = 'topup callback'");
	    $result->execute([":FromDate" => $From, ":ToDate" => $To, ":Response" => $response]);
		$row = $result->fetch();
		$gcash = $row["amount"];

		$result = $db->prepare("SELECT SUM(`amount`) AS `amount` FROM `pitmasters`.`loading_logs` WHERE `created_at` BETWEEN :From AND :To AND `transaction_type` = 'deposit'AND `gcash_log_id` != '1'AND `gcash_log_id` IS NOT NULL AND `load_to` != '78'");
	    $result->execute([":From" => $From, ":To" => $To]);
		$row = $result->fetch();
		$loading = $row["amount"];

	    $result = $db->prepare("SELECT `id` FROM `wallet` WHERE `db` = :DB AND `type` = :Type AND `date` = :Date AND `time` =:Time");
	    $result->execute([":db" => $db, ":date" => $date, ":time" => $time, ":Type" => "Top-Up");

	    if ($row = $result->fetch()) {
	    	$id = $row["id"];

	    	$result = $db->prepare("UPDATE `wallet` SET `gcash_logs`= :Gcash,`loading_logs`= :Loading WHERE `db` = :DB AND `type` = :Type AND `date` = :Date AND `time` =:Time");
	    	$result->execute([":DB" => $db, ":Type" => "Top-Up", ":Date" => $date, ":Time" => $time, ":Gcash" => $gcash, ":Loading" => $loading]);


	    }else{
	    	$result = $db->prepare("INSERT INTO `wallet`(`db`, `type`, `date`, `time`, `gcash_logs`, `loading_logs`) VALUES (:DB, :Type, :Date, :Time, :Gcash, :Loading)");
	    	$result->execute([":DB" => $db, ":Type" => "Top-Up", ":Date" => $date, ":Time" => $time, ":Gcash" => $gcash, ":Loading" => $loading]);
	    }
	    
	    $db->commit();
	}
	catch(Exception $e){
		console.log("there has an error in Updating Top-Up Gcash/Loading Logs: " . $e);
	    $db->rollBack();
	}

?>