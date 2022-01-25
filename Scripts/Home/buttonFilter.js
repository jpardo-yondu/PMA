$("#buttonFilter").on("click", function(evt){
	validate("formFilter", function(){
		
		var db = $("#filterDB").val();
		var type = $("#filterType").val();
		var from = $("#filterFrom").val();
		var to = $("#filterTo").val();
		
		var dateNow = new Date();
		var month = (dateNow.getMonth()+1); 
		month = month.toString().length == 1 ? "0" + month.toString() : month;
		var today = dateNow.getFullYear()+'-'+month+'-'+dateNow.getDate();

		if(from > to){
			swalMessage("", "<h4>The Date <span style = 'color: red; font-weight: 600'>FROM</span> should not be Higher in Date <span style = 'color: red; font-weight: 600'>TO</span></h4>", "error", false);
		}else if (to > today || from > today){
			swalMessage("", "<h4>The Filter Date should not be Higher the date Today</h4>", "error", false);
		}else{
			$("#divData").css("display", "none");
			$("#divSummary").css("display", "none");
			$(".divDataTable").css("display", "none");
			$(".divSummaryChart").css("display", "none");


	        var tableCurrentPoints = $("#tableCurrentPoints").DataTable();
	        tableCurrentPoints.clear().draw(); 

	        var tableWallet = $("#tableWallet").DataTable();
	        tableWallet.clear().draw(); 

	        var tablePerPlayer = $("#tablePerPlayer").DataTable();
	        tablePerPlayer.clear().draw(); 

	        var tablePerTransaction = $("#tablePerTransaction").DataTable();
	        tablePerTransaction.clear().draw(); 
	        
	        var tablePerArena = $("#tablePerArena").DataTable();
	        tablePerArena.clear().draw(); 
	        
	        var tableWTO = $("#tableWTO").DataTable();
	        tableWTO.clear().draw(); 

	        swalLoading("Retrieving Data");

	        var userdata = {
	        	'db': db,
	        	'from': from,
	        	'to': to
	        };
	        ajaxCustom("Home/retrieve"+type+".php", userdata, function(data){
				$("#divData").css("display", "");
				$("#divSummary").css("display", "");
				$("#div"+type).css("display", "");
				$("#div"+type+"_summary").css("display", "");

				switch(type){
					case "CurrentPoints":
						if(retrieveCurrentPoints(data))
							swal.close();
					break;
					case "Wallet":
						if(retrieveWallet(data))
							swal.close();
					break;
					case "PerPlayer":
						if(retrievePerPlayer(data))
							swal.close();
					break;
					case "PerTransaction":
						if(retrievePerTransaction(data))
							swal.close();
					break;
					case "PerArena":
						if(retrievePerArena(data))
							swal.close();
					break;
					case "WTO":
						if(retrieveWTO(data))
							swal.close();
					break;
					default:
						swalMessage("There has error in Retrieval of Data", "", "error", false);
					break;
				}


	        });

			
		}
	}, false);

	ajaxRules("filterDB filterType", "required", [true], evt);
	ajaxRules("filterFrom filterTo", "required date", [true, true], evt);
});