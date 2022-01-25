<?php
	$fullUserBrowser = (!empty($_SERVER['HTTP_USER_AGENT'])? 
	$_SERVER['HTTP_USER_AGENT']:getenv('HTTP_USER_AGENT'));
	$userBrowser = explode(')', $fullUserBrowser);
	$userBrowser = $userBrowser[count($userBrowser)-1];


	if((!$userBrowser || $userBrowser === '' || $userBrowser === ' ' || strpos($userBrowser, 'like Gecko') === 1) && strpos($fullUserBrowser, 'Windows') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if((strpos($userBrowser, 'Edge/') !== false || strpos($userBrowser, 'Edg/') !== false) && strpos($fullUserBrowser, 'Windows') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if(strpos($userBrowser, 'Firefox/') !== false || strpos($userBrowser, 'FxiOS/') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if(strpos($userBrowser, 'Safari/') !== false && strpos($fullUserBrowser, 'Mac') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if(strpos($userBrowser, 'OPR/') !== false && strpos($fullUserBrowser, 'Opera Mini') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if(strpos($userBrowser, 'OPR/') !== false){
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}
	else if(strpos($userBrowser, 'Chrome/') === 1 || strpos($userBrowser, 'CriOS/') === 1){
		// return 'Google-Chrome';
	}
	else{
		echo "<script>
			alert('Please use Google Chrome only.');
			location.replace('https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwq_D7BRADEiwAVMDdHltDMFh1e3W8WfMjpiJwtL89dbhqdPRl83CsvHaBqCd09Y1S2GMCHxoCcUQQAvD_BwE&gclsrc=aw.ds');
		</script>";
		die();
	}

?>