<?php
	require '../../Models/Connection/connection.php';

	$params = array(':DB' => POST("db"), ':FromDate' => POST("from"), ':ToDate' => POST("to"));
	$result = $db->prepare("SELECT `date`, `time`, `timeout`, `timeout_amount` FROM `wallet` WHERE `db` = :DB AND `date` <= :ToDate AND `date` >= :FromDate AND type = 'Withdraw';");
	$result->execute($params);

	while($row = $result->fetch()){
		$arrayData[] = array('message' => 'success', 'date' => $row['date'], 'time' => $row['time'], 'count' => $row['timeout'], 'amount' => ($row['timeout_amount']));
	}

	if(empty($arrayData)) $arrayData[] = array('message' => 'empty');

	echo json_encode($arrayData);
?>