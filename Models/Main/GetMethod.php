<?php
	function GET($arg)
	{
    	$temp = $_GET[$arg];

		$temp_str = str_replace(array('<', '../', ';'), '', $temp);
        $temp_str = str_replace(array("&"), '&#38;', $temp_str);
        $temp_str = str_replace(array('>'), '&#62;', $temp_str);
        $temp_str = str_replace(array('"'), '&#34;', $temp_str);
        $temp_str = str_replace(array("'"), '&#39;', $temp_str);
        $temp_str = str_replace(array("Ñ"), '&#209;', $temp_str);
        $temp_str = str_replace(array("ñ"), '&#241;', $temp_str);
        
        $temp_str = hex2bin(hex2bin($temp_str));
        return $temp_str;
    }
?>