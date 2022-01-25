function getScript(_url){
	$.ajax({
		dataType: "script",
		url: _url,
		cache: true,
		async: false
    });
}