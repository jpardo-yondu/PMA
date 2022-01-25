<?php
	function jsEncode($array){
		echo html_entity_decode(json_encode($array));
	}

?>