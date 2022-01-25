<?php
	require '../../Models/Connection/connection.php';

	$params = array(':DB' => POST("db"), ':FromDate' => POST("from"), ':ToDate' => POST("to"));
	$result = $db->prepare("SELECT `date`, `time`, `fullname`, `amount` FROM `user_details` WHERE `db` = :DB AND `date` <= :ToDate AND `date` >= :FromDate  ORDER BY `date` ASC, `time` ASC, `amount` DESC;");
	$result->execute($params);
 	
 	$i = 1;

	while($row = $result->fetch()){
		if ($i == 1){
			$h_name = $row["fullname"];
			$h_amount = $row["amount"];	
			$i++;
		}else{
			$arrayData[] = array('message' => 'success', 'date' => $row['date'], 'time' => $row['time'], 'h_name' => $h_name, 'h_amount' => ($h_amount), 'l_name' => $row['fullname'], 'l_amount' => ($row['amount']));
			$i = 1;
		}
	}

	if(empty($arrayData)) $arrayData[] = array('message' => 'empty', $params);

	echo json_encode($arrayData);
?>