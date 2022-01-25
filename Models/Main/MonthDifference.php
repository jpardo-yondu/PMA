<?php
	function MonthDiff($from, $to = "now"){
		$date1 = $from;
		if ($to == "now")
			$date2 = date("Y/m/d");
		else
			$date2 = $to;

		$ts1 = strtotime($date1);
		$ts2 = strtotime($date2);

		$year1 = date('Y', $ts1);
		$year2 = date('Y', $ts2);

		$month1 = date('m', $ts1);
		$month2 = date('m', $ts2);

		$diff = (($year2 - $year1) * 12) + ($month2 - $month1);

		return $diff;
	}

?>