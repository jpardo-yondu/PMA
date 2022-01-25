<?php
function StrToArr($data, $seperator, $remove){
	$data = str_replace($remove, "", $data);
    $data = substr($data, 0, strlen($data) - strlen($seperator));
    $data = explode($seperator, $data);
    return $data;
}


?>