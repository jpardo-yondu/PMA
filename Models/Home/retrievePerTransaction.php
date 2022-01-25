<?php
	require '../../Models/Connection/connection.php';

	$params = array(':DB' => POST("db"), ':FromDate' => POST("from"), ':ToDate' => POST("to"));
	$result = $db->prepare("SELECT `type`, `date`, `time`, `highest_amount_transaction` FROM `wallet` WHERE `db` = :DB AND `date` <= :ToDate AND `date` >= :FromDate;");
	$result->execute($params);

	while($row = $result->fetch()){
		$arrayData[] = array('message' => 'success', 'date' => $row['date'], 'time' => $row['time'], 'type' => $row['type'], 'amount' => ($row['highest_amount_transaction']));
	}

	if(empty($arrayData)) $arrayData[] = array('message' => 'empty');

	echo json_encode($arrayData);
?>