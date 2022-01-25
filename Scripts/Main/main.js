//ajaxCustom Ajax Method
	function ajaxMessage(message){
	    if(message == "Connection Error"){
	        swalMessage(
	            "503: SERVICE UNAVAILABLE", 
	            "The Server is temporarily unable to service your request due to maintenance downtime or capacity problem. Please Try Again Later.", 
	            "warning");
	    }
	    else if(message == "Request Timeout"){
	        swalMessage("408: REQUEST TIMEOUT", 
	            "For your security, the page will automatically refresh as there was no activity for more than 30 minutes.", 
	            "warning", true);
	    }
	    else if(message == "Session Timeout"){
	        swalMessage("440: SESSION EXPIRED", 
	            "For your security, Your account has been log out as there was no activity for more than 1 hour.", 
	            "warning", true);
	    }
	    else if(message == "empty"){
	        swalMessage("No Records Found", "", "warning");
	    }
	    else if(message == "xuser"){
	        swalMessage("Invalid Username", "", "warning", true);
	    }
	    else if(message == "user not found"){
	        swalMessage("Employee not found", "", "warning");
	    }
	    else if(message == "xpass"){
	        swalMessage("Invalid Password", "", "warning", true);
	    }
	    else if(message == "not active"){
	        swalMessage("This Account is not Activated", "", "warning", true);
	    }
	    else if(message == "Default"){
	        location.replace("../../View/User/Change_Password.php");
	    }
	    else if(message == "Invalid Length"){
	        swalMessage("Search atleast 3 Characters", "", "warning");
	    }
	    else if(message == "ID Error"){
	        swalMessage("No Valid ID", "Please contact the MIS Programmer. Thank You!", "error", false, function(){
	            swal.close();
	        });
	    }
	    else if(message == "Cannot Change Password"){
	        swalMessage("Your password does not match up", "<h6>You cannot change your Password. Your current password does not match up with your input password.</h6>", "error", false, function(){
	            swal.close();
	        });
	    }
	    else{
	        swalMessage("System Error", 
	            "Please contact the MIS Programmer. Thank you!", 
	            "error");
	    }
	}
	function ajaxCustom(_url, userdata, _callback = "", success = true, _async = true){
		console.clear();
		userdata["cnsc_ORAS"] = $('#cnsc_ORAS').val();
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt){
					// swalLoading("Retrieving the Data from Server");
				}, false);
				xhr.addEventListener("progress", function(evt){
					// swalLoading("Sending the Data to Server");
				}, false);
				return xhr;
	    	},
			type: "POST", 
			url: "../../Models/"+_url, 
			data:userdata,
	        async: _async,
			success: function(data){
				try{
					var tempData = JSON.parse(data); 
					try{var mess = tempData[0].message;}catch(err){mess = err;}
					if(mess == "success" || !success){
						_callback(tempData);
					}
		    		else {
		    			ajaxMessage(mess);
		    		}
				}catch(err){
					console.log(err);
					swalMessage("System Error", "<h5>Please contact the MIS Programmer. Thank you!</h5>", "error", true);
				}
			},
			error: function (jqXHR, exception){
				var msg = '', html = "<h5>Please contact the MIS Programmer. Thank you!</h5>";
		        if (jqXHR.status === 0) {
		            msg = 'No Internet Connection';
		            html = "";
		        } else if (jqXHR.status == 404) {
		            msg = 'Requested Page Not Found';
		        } else if (jqXHR.status == 500) {
		            msg = 'Internal Server Error.';
		        } else if (exception === 'parsererror') {
		            msg = 'Requested JSON parse failed.';
		        } else if (exception === 'timeout') {
		            msg = 'Time Out Error.';
		        } else if (exception === 'abort') {
		            msg = 'Ajax Request Aborted.';
		        } else {
		            // msg = 'Uncaught Error.\n' + jqXHR.responseText;
		            msg = "System Error";
		        }
				swalMessage(msg, html, "error", true);
			},
			complete:function(data){
				var tempData = JSON.parse(data.responseText);
				// console.clear();
				console.log(tempData); 
				if(tempData == null && success)ajaxMessage("empty");
			}
		});
	}
	function ajaxFile(_url, userdata, _callback = ""){
		console.clear();
		var formData = new FormData();
		formData.append('cnsc_ORAS', $('#cnsc_ORAS').val());

        for ( var key in userdata){
			formData.append(key, userdata[key]);
        }
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt){
					// swalLoading("Retrieving the Data from Server");
				}, false);
				xhr.addEventListener("progress", function(evt){
					// swalLoading("Sending the Data to Server");
				}, false);
				return xhr;
	    	},
			type: "POST", 
			url: "../../Models/"+_url, 
			data:formData,
			contentType: false,
			processData: false,
			success: function(data){
				try{
					var tempData = JSON.parse(data); 
					try{var mess = tempData[0].message;}catch(err){mess = err;}
					if(mess == "success"){
						_callback(tempData);
					}
		    		else {
		    			ajaxMessage(mess);
		    		}
				}catch(err){
					console.log(err);
					swalMessage("System Error", "<h5>Please contact the MIS Programmer. Thank you!</h5>", "error", true);
				}
			},
			error: function (jqXHR, exception){
				var msg = '', html = "<h5>Please contact the MIS Programmer. Thank you!</h5>";
		        if (jqXHR.status === 0) {
		            msg = 'No Internet Connection';
		            html = "";
		        } else if (jqXHR.status == 404) {
		            msg = 'Requested Page Not Found';
		        } else if (jqXHR.status == 500) {
		            msg = 'Internal Server Error.';
		        } else if (exception === 'parsererror') {
		            msg = 'Requested JSON parse failed.';
		        } else if (exception === 'timeout') {
		            msg = 'Time Out Error.';
		        } else if (exception === 'abort') {
		            msg = 'Ajax Request Aborted.';
		        } else {
		            // msg = 'Uncaught Error.\n' + jqXHR.responseText;
		            msg = "System Error";
		        }
				swalMessage(msg, html, "error", true);
			},
			complete:function(data){
				var tempData = JSON.parse(data.responseText);
				// console.clear();
				console.log(tempData); 
			}
		});
	}
//Ajax Rules
	function addRule(ID, rule, data){
	    if($("#"+ID).length > 0){
	        if(rule != "regex"){
	            data = data.toString().includes("#") ? "\""+data+"\"" : data;
	            data = data == "No Stock" ? "\""+data+"\"" : data
	            data = data.toString().trim();
	            var obj = '{'+rule+':'+data+'}';
	            var jsonStr = obj.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
	              return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
	            });
	            obj = JSON.parse(jsonStr);
	            $("#"+ID).rules( "add", obj);
	        }else{
	            data = data.trim();
	            $("#"+ID).rules( "add", {
	                regex:data
	            });
	        }
	        return true;
	    }else{
	        console.log($("#"+ID));
	        console.log($("#"+ID).val()== undefined);
	        console.log($("#"+ID).val() == null);
	        return false;
	    }
	}
	function ajaxRules(id, exp, data, evt){
	    var splitID = id.split(" ");
	    var splitRule = exp.split(" ");
	    for (var loopID = 0; loopID < splitID.length; loopID++) {
	        $("#" + splitID[ loopID ]).rules( "remove", exp );
	        for (var loopRule = 0; loopRule < splitRule.length; loopRule++) {
	            if(!Array.isArray(data[loopRule])){
	                var ret = addRule(splitID[loopID], splitRule[loopRule], data[loopRule]);
	                if (!ret){
	                    evt.preventDefault();
	                    ajaxMessage("ID Error");
	                    return false;
	                }
	            }
	            else{
	                if(data[loopRule][loopID] != "" && data[loopRule][loopID] != undefined){
	                     var ret = addRule(splitID[loopID], splitRule[loopRule], data[loopRule][loopID]);
	                     if (!ret){
	                        evt.preventDefault();
	                        ajaxMessage("ID Error");
	                        return false;
	                    }
	                }
	            }
	        }
	    }
	    return true;
	}
	function validate(ID, _callback, ttip = false){
		if (ttip){
			var formValidate = $('#'+ID).validate({
		        errorPlacement: function (error, element) {
		            $(element).tooltipster('update', $(error).text());
		            $(element).tooltipster('show');
		        },
		        success: function (label, element) {
		            $(element).tooltipster('hide');
		        },
				submitHandler: function(form, e) {
					e.preventDefault();
					_callback();
					formValidate.destroy();
				}
			});
		}else{
			var formValidate = $('#'+ID).validate({
				submitHandler: function(form, e) {
					e.preventDefault();
					_callback();
					formValidate.destroy();
				}
			});
		}
	}
//Data table Method 
	function JSTable(data, id, value, rowID = "", hidden = [], length = []){
	    if (data != null){
	        var table = $(id).DataTable();
	        table.clear().draw(); 
	        $(id).dataTable().fnDestroy();
	        var arr = [];
	        for (var i = 0; i < value.length; i++){
	            arr.push({
	                data: value[i]
	            });
	        }
	        if (rowID == ""){
	            var table = $(id).DataTable( {
	            	dom: 'Bfrtip',
			        buttons: [
			            'copyHtml5',
			            'excelHtml5',
			            'csvHtml5',
			            'pdfHtml5'
			        ],
	                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	                data: data,
	                columns: arr,
	                columnDefs: [{ 
	                    targets: '_all', 
	                    render: $.fn.dataTable.render.ellipsis()
	                }]
	            });
	        }else{
	            var table = $(id).DataTable( {
	            	dom: 'Bfrtip',
			        buttons: [
			            'copyHtml5',
			            'excelHtml5',
			            'csvHtml5',
			            'pdfHtml5'
			        ],
	                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	                data: data,
	                columns: arr ,
	                rowId: rowID,
	                columnDefs: [{ 
	                    targets: '_all', 
	                    render: $.fn.dataTable.render.ellipsis()
	                }]
	                
	            });
	        }
	        table.on( 'responsive-resize', function ( e, datatable, columns ) {
	            var count = columns.reduce( function (a,b) {
	                return b === false ? a+1 : a;
	            }, 0 );
	        } );
	        for (var i = 0; i < hidden.length; i++) {
	            table.columns(hidden[i]).visible(false);
	        }
	    }
	}
	function JSTable_WoRestrict(data, id, value, rowID = "", hidden = []){
	    if (data != null){
	        var table = $(id).DataTable();
	        table.clear().draw(); 
	        $(id).dataTable().fnDestroy();
	        var arr = [];
	        for (var i = 0; i < value.length; i++){
	            arr.push({data: value[i]});
	        }
	        if (rowID == ""){
	            var table = $(id).DataTable( {
	                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	                data: data,
	                columns: arr
	            });
	        }else{
	            var table = $(id).DataTable( {
	                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
	                data: data,
	                columns: arr ,
	                rowId: rowID
	            });
	        }
	        
	        table.on( 'responsive-resize', function ( e, datatable, columns ) {
	            var count = columns.reduce( function (a,b) {
	                return b === false ? a+1 : a;
	            }, 0 );
	        } );
	        for (var i = 0; i < hidden.length; i++) {
	            table.columns(hidden[i]).visible(false);
	        }
	    }
	}
	function DTContextMenu(_selector, _items, _callback){
	    var selected_row;
	    $(document).on("click", _selector  + " tbody tr" + "", function(){
	        var table = $(_selector).DataTable();
	        selected_row = table.row(this).data();
	        if(selected_row){
	            ChangeRowColor(_selector.replace("#", ""), this);
	        }   
	    });

	    $.contextMenu({
	        selector: _selector + " tbody tr", 
	        trigger: "left",
	        hideOnSecondTrigger: true,
	        callback: function (key, options){
	            _callback(key, selected_row);
	        },
	        events:{
	            preShow: function(){
	                if($(_selector  + " tbody tr").has("td.dataTables_empty").length > 0){
	                    $(_selector  + " tbody tr").contextMenu(false);
	                }else{
	                    $(_selector  + " tbody tr").contextMenu(true);                        
	                }
	            },
	            hide: function(options){
	                ChangeRowColor(_selector.replace("#", ""), "");
	                $(_selector  + " tbody tr").removeClass("selected_row");
	                return true;
	            }
	        },
	        items: {
	            "Select": {name: "Select", icon: "fa-mouse-pointer", "visible": checkArrayValue(_items, "Select")},
	            "View": {name: "View", icon: "fa-info", "visible": checkArrayValue(_items, "View")},
	            "Search": {name: "Search", icon: "fa-search", "visible": checkArrayValue(_items, "Search")},
	            "Add": {name: "Add", icon: "fa-plus-circle", "visible": checkArrayValue(_items, "Add")},
	            "Edit": {name: "Edit", icon: "fa-pencil", "visible": checkArrayValue(_items, "Edit")},
	            "Delete": {name: "Delete", icon: "fa-trash", "visible": checkArrayValue(_items, "Delete")},
	            "Move": {name: "Move", icon: "fa-clipboard", "visible": checkArrayValue(_items, "Move")},
	            "Copy": {name: "Copy", icon: "fa-clipboard", "visible": checkArrayValue(_items, "Copy")}
	        }
	    });   
	}    
	function ChangeRowColor(table, id){
		$('#'+table+' tbody tr').css("background-color", "white");
		$('#'+table+' tbody tr').css("color", "black");
		$('#'+table+' tbody tr').css("font-weight", "400");

		$(id).css("background-color", "goldenrod");
		$(id).css("color", "white");
		$(id).css("font-weight", "700");
	}
	function checkArrayValue(arrayItem, valueItem){
	    for (var i = 0; i < arrayItem.length; i++) {
	        if(arrayItem[i] == valueItem)
	            return true;
	    }
	    return false;
	}
//ContextMenu
	function initialContextMenu(_selector, _items, _callback){
		$.contextMenu({
		    selector: _selector,
		    autoHide: true,
	        callback: function (key, options){
	            _callback(key, this[0].id);
	        },
		    items: {
		        "Preview": {name: "Preview", icon: "fa-eye", "visible": checkArrayValue(_items, "Preview")},
		        "Details": {name: "Details", icon: "fa-info", "visible": checkArrayValue(_items, "Details")},
		        "Comment": {name: "Comments", icon: "fa-comment-o", "visible": checkArrayValue(_items, "Comment")},
		        "Starred": {name: "Starred", icon: "fa-star-o", "visible": checkArrayValue(_items, "Starred")},
		        "Move": {name: "Move to", icon: "fa-folder-open-o", "visible": checkArrayValue(_items, "Move")},
		        "Copy": {name: "Make a Copy", icon: "fa-clone", "visible": checkArrayValue(_items, "Copy")},
		        "Rename": {name: "Rename", icon: "fa-pencil", "visible": checkArrayValue(_items, "Rename")},
		        "Delete": {name: "Delete", icon: "fa-trash", "visible": checkArrayValue(_items, "Delete")},
		        "Link": {name: "Get Link", icon: "fa-link", "visible": checkArrayValue(_items, "Link")},
		        "Share": {name: "Share", icon: "fa-user-plus", "visible": checkArrayValue(_items, "Share")},
		        "Download": {name: "Download", icon: "fa-download", "visible": checkArrayValue(_items, "Download")}
		    }
		});   

	}
//Date Method
	function monthDiff(from, to = "now") {
	    var months;
	    if (to == "now"){
		    to = Date.now();
		  	to = new Date(to);
	    }
	    from = new Date(from);
	    months = (to.getFullYear() - from.getFullYear()) * 12;
	    months -= from.getMonth();
	    months += to.getMonth();
	    return months <= 0 ? 0 : months;
	}
//Select2 
	function initialSelect2(id, link, argument){
		$("#"+id).select2({
			minimumInputLength: 3,
			placeholder: "Type to Search",
		    language: {
		        noResults: function () {
		            return "Search not found. Please Try another Word/Term";
		        },
		        searching: function () {
		            return "Searching, Please Wait for a while...";
		        }
		    },
			ajax:{
				type: "POST", 
				url: "../../Models/"+link,
				dataType: "json",
				delay: 250,
				data: function(params){
					return {
						cnsc_ORAS: $("#cnsc_ORAS").val(),
						ID: params.term
					};
				},
				processResults: function(data, params){
					var select2Data = $.map(data, function (obj) {
	                    obj.id = obj.ID;
	                    if (obj.Code == "" || obj.Code == undefined)
	                    	obj.text = obj.Name;
	                	else
	                    	obj.text = obj.Name + " (" + obj.Code + ")";

	                    return obj;
	                });

	                return {
	                    results: select2Data
	                };
				}
			}
		});
	}
	function Select2Default(selectId, id, text){
		var data = {
			id: id,
			text: text
		};
		if(id != "0" && id != 0){
			var newOption = new Option(data.text, data.id, false, false);
			$("#"+selectId).empty().append(newOption).trigger('change');
		}else{
			$("#"+selectId).empty();
		}
	}
	function newSelect2Option(selectId, id, text, code = "", no = 0){
		text = code == "" ? text : text + " (" + code + ")";
		var data = {
			id: id,
			text: text
		};
		var newOption = new Option(data.text, data.id, false, false);
		if(no == "0" && no == 0){
			var defaultOption = new Option("", "", true, true);
			$("#"+selectId).empty().append(defaultOption).trigger('change');
			$("#"+selectId+" option[value='']").attr('disabled', 'disabled');
		}
		$("#"+selectId).append(newOption).trigger('change');
	}
	function newDatalistOption(datalist, value, text, id, no = 0, optionDisabled = true){
		
		if(no == 0 || no == "0"){
			if(optionDisabled == "none")
				$('#'+datalist).empty();
			else if (optionDisabled)
	        	$('#'+datalist).empty().append('<option disabled selected></option>');
	        else
				$('#'+datalist).empty().append('<option value="Not Applicable" data-id = "0" selected></option>');
		}
	    $('#'+datalist).append('<option value = "'+value+'" data-id = "'+id+'">' + text + '</option>');	
	}
//Swal Fire Method
	function swalLoading(swalTitle = "Loading. . ."){
		Swal.fire({          
	        title: swalTitle,
	        html: "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>",
	        allowEscapeKey: false,
	        allowEnterKey: false,
	        allowOutsideClick: false,
	        showConfirmButton: false,
	    });
	}
	function swalMessage(swalTitle, swalHTML, swalType = "success", swalReload = false, _callback = ""){
		Swal.fire({
	        title: swalTitle,
	        html: swalHTML,
	        allowEscapeKey: false,
	        allowEnterKey: false,
	        allowOutsideClick: false,
	        icon: swalType
	    }).then(function(isconfirm){
	    	if(_callback != "")_callback();
	    	if(swalReload) location.reload();
	    });
	}
	function swalConfirm(swalTitle, swalHTML, swalType = "info", _callbackConfirm = "", _callbackCancel = ""){
		Swal.fire({
			title: swalTitle,
	        html: swalHTML,
	        allowEnterKey: false,
			allowEscapeKey: false,
			allowOutsideClick: false,
			showCancelButton: true,
	        confirmButtonText: 'Yes',
	        cancelButtonText: 'No',
			icon: swalType
		}).then(function(isconfirm){
			if (isconfirm.dismiss === Swal.DismissReason.cancel){
	            if(_callbackCancel != "")_callbackCancel();
				else swal.close();
			}
			else{
	    		if(_callbackConfirm != "")_callbackConfirm();
	    		else swal.close();
			}
		});
	}
	function swalAddAgain(swalTitle, swalHTML, _callback = ""){
		Swal.fire({
			title: swalTitle,
	        html: swalHTML,
			allowEscapeKey: false,
	        allowEnterKey: false,
			allowOutsideClick: false,
			showCancelButton: true,
			confirmButtonText: 'Add Again?',
			cancelButtonText: 'No',
			icon: "success"
		}).then(function(isconfirm){
			if (isconfirm.dismiss === Swal.DismissReason.cancel){
	    		if(_callback != "")_callback();
				swal.close();
			}
			else{
				location.reload();
				swal.close();
			}
		});
	}
	function swalGenerate(swalTitle, swalHTML, confirmBtn, _url, _urlCont = "", swalReload = true){
		Swal.fire({
	        title: swalTitle,
	        html: swalHTML,
	        allowEscapeKey: false,
	        allowEnterKey: false,
	        allowOutsideClick: false,
	        showCancelButton: true,
	        confirmButtonText: confirmBtn,
	        cancelButtonText: 'Continue',
	        icon: "success"
	    }).then(function(isconfirm){
	        if (isconfirm.dismiss === Swal.DismissReason.cancel){
	            if(_urlCont == "") {
	            	if (swalReload) location.reload();
	            } 
	            else location.replace(_urlCont);
	        }
	        else{
	            window.open(_url,'_blank');
	            if(_urlCont == "") {
	            	if (swalReload) location.reload();
	            } 
	            else location.replace(_urlCont);
	        }
	    });	
	}
//Money Format Method
	function formatMoney(amount, id = "", decimalCount = 2, decimal = ".", thousands = ",") {
	  try {
	    var initial = amount;
	    decimalCount = Math.abs(decimalCount);
	    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

	    const negativeSign = amount < 0 ? "-" : "";
	    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
	    let j = (i.length > 3) ? i.length % 3 : 0;
	    var returnVal = negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
	    if(id == "") return returnVal;
	    else{
	      if (returnVal == "0.00" && initial != "0"){
	        returnVal = "";
	        Swal.fire({
	            title: "Only Numbers are Accepted",
	            allowEscapeKey: false,
	            allowOutsideClick: false,
	            icon: 'warning'
	        }).then(function(isconfirm){
	          swal.close();
	        });
	      } 
	      if (negativeSign == "-") {
	        returnVal = "";
	        Swal.fire({
	            title: "Please enter a value greater than to 0",
	            allowEscapeKey: false,
	            allowOutsideClick: false,
	            icon: 'warning'
	        }).then(function(isconfirm){
	          swal.close();
	        });
	      }
	      $('#'+id).val(returnVal);
	    } 
	  } catch (e) {
	  }
	}
	function BackToNumbers(amount){
	  var temp = amount.split(",");
	  var res = "";
	  for(var i = 0; i < temp.length; i++){
	    res += temp[i];
	  }
	  return parseFloat(res);
	}
//initialization of date time picker
	function initialDatetimepicker(id, dateType = "year"){
		if(dateType == "month"){
			$("#"+id).datetimepicker({
			    format      :   "MMMM YYYY",
			    viewMode    :   "months"
			});
		}
		if(dateType == "year"){
			$("#"+id).datetimepicker({
			    format      :   "YYYY",
			    viewMode    :   "years"
			});
		}
	}
//toHex GETURL and Windows Open
	function toHex(str) {
		var result = '';
		for (var i=0; i<str.length; i++) {
			result += str.charCodeAt(i).toString(16);
		}
		return result;
	} 
	function GetURL(_url, ID, arg){
		var temp = "";
		for (var i = 0; i < ID.length; i++) {
			temp += ID[i] + "=" + toHex(toHex((arg[i]).toString())) + "&";
		}
		temp = temp.slice(0, -1);
		temp = _url + "?" + temp;
		
		return temp;
	}
	function windowOpen(_url){
		window.open(_url, '_blank');
	}
//Cookie
	function setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	}
	$(document).ready(function() {
//Input Type
	    $("form, textarea, input").attr("autocomplete", "off");
	    
	    $('input').on('keydown', function(){
	        if($('input').css('color') != 'black' && this.id != "textSearchSideBar") $('input').css('color', 'black');
	        if($('input').css('color') == "rgb(255, 0, 0)") $('input').css('color', 'black');
	    });
//Data Table Initialize
		var tableDeclaration = $('.table').DataTable({responsive: true});

	    $.fn.dataTable.render.ellipsis = function () {
		    return function ( data, type, row ) {
		    	if (data != null){
			        return type === 'display' && data.length > 30 ?
			            "<span title='" + data + "'>" + data + '... </span>' :
			            "<span title='" + data + "'>" + data  + '</span>';
		    	}
		    	return data;
		    }
		};
//Ajax Validation Rules
		$.validator.addMethod(
		    "InputTextBox",
		    function(value, element) {
		        var re = new RegExp(/^[a-zA-Z0-9ñÑ\n :,!@#\$%\^\&*\/\)\(+=._-]+$/g);
		        return this.optional(element) || re.test(value);
		    },
		    "Please check your input."
		);
		$.validator.addMethod(
		    "duplicate",
		    function(value, element) {
		        var col = element.style.color;
		        if(element.style.color == "red")
		            return false;
		        else
		            return true;
		    },
		    "Duplicate Entry/Value"
		);
		$.validator.addMethod(
		    "dateFormat",
		    function(value, element) {
		        var check = false;
		        var re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
		        if( re.test(value)){
		            var adata = value.split('-');
		            var dd = parseInt(adata[2],10);
		            var mm = parseInt(adata[1],10);
		            var yyyy = parseInt(adata[0],10);
		            var xdata = new Date(yyyy,mm-1,dd);
		            if ( ( xdata.getFullYear() === yyyy ) && ( xdata.getMonth () === mm - 1 ) && ( xdata.getDate() === dd ) ) {
		                check = true;
		            }
		            else {
		                check = false;
		            }
		        } 
		        else {
		            check = false;
		        }
		        return this.optional(element) || check;
		    },
		    "Wrong date format (mm/dd/yyyy)"
		);
//Other - Plugin Initialize
	    $('.select2').select2();
	  	$('[data-toggle="tooltip"]').tooltip()

		jQuery.validator.setDefaults({
		  	ignore: []
		});
//Validate Tooltip
		$('input, textarea, select').tooltipster({
	        trigger: 'custom',
	        onlyOne: false,
	        position: 'right'
	    });
	});
//Sidebar
	$(document).ready(function(){
        $("#btn").on("click", function(){
			$(".sidebar").toggleClass("open");
         	menuBtnChange();
        });
        function menuBtnChange() {
			if($(".sidebar").hasClass("open")){
				$("#btn").removeClass("fa-bars").addClass("fa-times");
			}else {
				$("#btn").removeClass("fa-times").addClass("fa-bars");
			}
        }
	});
//breadcrumb
	function tagType(index){
		switch (index) {
			case 1:
				show = "year";
				break;
			case 2:
				show = "tag";
				break;
			case 3:
				show = "campus";
				break;
			case 4:
				show = "course";
				break;
			default:
				show = "folder"+(index-5);
				break;
		}
		return show;
	}
	function addBreadcrumb(id, code){
		$(".current").removeClass("current");
		$(".cd-breadcrumb").append('<li class="breadcrumbClass current" id = "'+id+'">'+code+'</li>')
	}
	function removeBreadcrumb(id){
		var arr = [];
		var index = 0, i = 0, show = "";
		$(".breadcrumbClass").each(function(){
			arr.push(this.id);
			i++;
			if (id == this.id)
				index = i; 
		});
		for(var i = arr.length-1; i >= 0; i--){
			if (id == arr[i]) break;
			$("#"+arr[i-1]).addClass("current");
			$("#"+arr[i]).remove();
		}
		show = tagType(index);
		$("."+show).css("display", "");
		if(show.includes("folder"))
			$(".file-"+tagType(index-1)).css("display", "");
		$(".content-"+show).html("");
		if(arr[0] == "Homepage"){
			switch (show) {
				case "campus":
					miniID = "miniDept";
					miniLabel = "Add New Department";
					break;
				case "course":
					miniID = "miniCourse";
					miniLabel = "Add New Class Program";
					break;
				case "tag":
					miniID = "miniTag";
					miniLabel = "Add New Tag";
					break;
				case "year":
					miniID = "";
					miniLabel = "";
					break;
				case "folder0":
					miniID = "miniFolder";
					miniLabel = "Parent Folder";
					break;
				default:
					miniID = "miniFolder";
					miniLabel = "Folder";
					break;
			}
			if (miniID != "" && miniLabel != "")
				$("#startMiniButton").html(miniButton(miniID, miniLabel));
			else{
				$("#startMiniButton").html("");
			}
		}
	}
	function breadCrumbID(){
		var arr = {};
		$(".breadcrumbClass").each(function(){
			if(this.id != "Homepage")
				arr[(this.id).split("-")[0]] = (this.id).split("-")[1];
		});
		return arr;
	}
	function parentFolder(){
		var parentID = 0;
		var temp = breadCrumbID();
		var typeID = 5;

		for (; typeID <= Object.keys(temp).length; typeID++) {
			parentID = breadCrumbID()[tagType(typeID)];
		}
		return [parentID, typeID];
	}
	function contentID(){
		var temp = "";
		$(".breadcrumbClass").each(function(){
			if(this.id != "Homepage")
				temp += (this.id).split("-")[1] +"-";
		});
		temp = temp.substr(0, temp.length - 1);
		return temp;
	}
	$(document).on("click", ".breadcrumbClass", function(){
		removeBreadcrumb(this.id);
	});
//document type
	function MIMEIcon(paramsType){
		var arrMIMEIcon = [
			["3GPP audio container", "fa-file-audio-o", "purple", "audio"],
			["3GPP2 audio container", "fa-file-audio-o", "purple", "audio"],
			["CD audio", "fa-file-audio-o", "purple", "audio"],
			["MPEG 4 Audio", "fa-file-audio-o", "purple", "audio"],
			["Musical Instrument Digital Interface (MIDI)", "fa-file-audio-o", "purple", "audio"],
			["Musical Instrument Digital Interface (MIDI)", "fa-file-audio-o", "purple", "audio"],
			["MP3 audio", "fa-file-audio-o", "purple", "audio"],
			["OGG audio", "fa-file-audio-o", "purple", "audio"],
			["Waveform Audio Format", "fa-file-audio-o", "purple", "audio"],
			["WEBM audio", "fa-file-audio-o", "purple", "audio"],
			["Adobe Portable Document Format (PDF)", "fa-file-pdf-o", "red", "document"],
			["JPEG images", "fa-picture-o", "green", "image"],
			["JPEG images", "fa-picture-o", "green", "image"],
			["Portable Network Graphics", "fa-picture-o", "green", "image"],
			["Scalable Vector Graphics (SVG)", "fa-picture-o", "green", "image"],
			["Tagged Image File Format (TIFF)", "fa-picture-o", "green", "image"],
			["Tagged Image File Format (TIFF)", "fa-picture-o", "green", "image"],
			["WEBP image", "fa-picture-o", "green", "image"],
			["3GPP video container", "fa-video-camera", "#0c62ce", "video"],
			["3GPP2 video container", "fa-video-camera", "#0c62ce", "video"],
			["AAC audio", "fa-video-camera", "#0c62ce", "video"],
			["Audio Video Interleave", "fa-video-camera", "#0c62ce", "video"],
			["Flash Video", "fa-video-camera", "#0c62ce", "video"],
			["iPhone Index Video", "fa-video-camera", "#0c62ce", "video"],
			["MP4 video", "fa-video-camera", "#0c62ce", "video"],
			["MPEG Video", "fa-video-camera", "#0c62ce", "video"],
			["QuickTime Video", "fa-video-camera", "#0c62ce", "video"],
			["OGG video", "fa-video-camera", "#0c62ce", "video"],
			["MPEG transport stream", "fa-video-camera", "#0c62ce", "video"],
			["WEBM video", "fa-video-camera", "#0c62ce", "video"],
			["Windows Media Video", "fa-video-camera", "#0c62ce", "video"]
		];
		var result;
		for (var i = 0; i < arrMIMEIcon.length; i++) {
			if(arrMIMEIcon[i][0] == paramsType){
				result = arrMIMEIcon[i];
			}
		}
		return result;
	}
	function MIMEType(){
		var arrMIMEType = [
			//Audio 
			["Audio Format", "3GPP audio container", ".3gp", "audio/3gpp"],
			["Audio Format", "3GPP2 audio container", ".3g2", "audio/3gpp2"],
			["Audio Format", "CD audio", ".cda", "application/x-cdf"],
			["Audio Format", "MPEG 4 Audio", ".m4a", "audio/x-m4a"],
			["Audio Format", "Musical Instrument Digital Interface (MIDI)", ".mid", "audio/midi"],
			["Audio Format", "Musical Instrument Digital Interface (MIDI)", ".midi", "audio/x-midi"],
			["Audio Format", "MP3 audio", ".mp3", "audio/mpeg"],
			["Audio Format", "OGG audio", ".oga", "audio/ogg"],
			["Audio Format", "Waveform Audio Format", ".wav", "audio/wav"],
			["Audio Format", "WEBM audio", ".weba", "audio/webm"],
			//Document
			["Document Format", "Adobe Portable Document Format (PDF)", ".pdf", "application/pdf"],
			//Image
			["Image Format", "JPEG images", ".jpg", "image/jpeg"],
			["Image Format", "JPEG images", ".jpeg", "image/jpeg"],
			["Image Format", "Portable Network Graphics", ".png", "image/png"],
			["Image Format", "Scalable Vector Graphics (SVG)", ".svg", "image/svg+xml"],
			["Image Format", "Tagged Image File Format (TIFF)", ".tif ", "image/tiff"],
			["Image Format", "Tagged Image File Format (TIFF)", ".tiff", "image/tiff"],
			["Image Format", "WEBP image", ".webp", "image/webp"],
			//Video
			["Video Format", "3GPP video container", ".3gp", "video/3gpp"],
			["Video Format", "3GPP2 video container", ".3g2", "video/3gpp2"],
			["Video Format", "AAC audio", ".aac", "audio/aac"],
			["Video Format", "Audio Video Interleave", ".avi", "video/x-msvideo"],
			["Video Format", "Flash Video", ".flv", "video/x-flv"],
			["Video Format", "iPhone Index Video", ".m3u8", "application/x-mpegURL"],
			["Video Format", "MP4 video", ".mp4", "video/mp4"],
			["Video Format", "MPEG Video", ".mpeg", "video/mpeg"],
			["Video Format", "QuickTime Video", ".mov", "video/quicktime"],
			["Video Format", "OGG video", ".ogv", "video/ogg"],
			["Video Format", "MPEG transport stream", ".ts", "video/MP2T"],
			["Video Format", "WEBM video", ".webm", "video/webm"],
			["Video Format", "Windows Media Video", ".wmv", "video/x-ms-wmv"]
		];
		return arrMIMEType;
	}
	function checkMIMEType(paramsType){
		var arrMIMEType = MIMEType();
		var temp = ["Invalid Format"];
		for (var i = 0; i < arrMIMEType.length; i++) {
			if(arrMIMEType[i][3] == paramsType){
				temp = arrMIMEType[i];
				break;
			}
		}
		return temp;
	}
	function MIMEDisplay(paramsType){
		var arrMIMEType = MIMEType();
		var temp = ["Invalid Format"];
		for (var i = 0; i < arrMIMEType.length; i++) {
			if(arrMIMEType[i][1] == paramsType){
				temp = arrMIMEType[i];
				break;
			}
		}
		return temp;
	}
//Change DIV Box
	function changeBox(start, code, label, classCode, starred = false){
		var displayStar = starred ? "" : "none";
		classType = classCode.includes("folder") ? "Folder " + classCode : classCode;
		return '<div id = "year-'+start+'" class="divBox '+classType+'" aria-code = "'+code+'">'+
				'<i class="fa fa-folder" style = "margin-right: 10px; font-size: 16px; color: #e8af00"></i>'+label
		        +'<img id = "img-'+start+'" src="../../Content/content_photos/loading-sm.gif" style="width: 25px; display: none;">\
		        <i  id = "folderStar-'+start+'" class="fa fa-star" style="color: #686868; display: '+displayStar+'"></i>\
		       </div><div id = "content-'+start+'" class = "content-'+classCode+'">\
		        </div>\
	        ';
	}
	function NoInfo(label = "No File/Folder Uploaded"){
		return '<div class="divBox noinfo" style = "cursor: default"><i class="fa fa-info-circle" style = "margin-right: 15px;  font-size: 16px;"></i>'+label+'</div>\
	        ';
	}
	function miniButton(id, label){
		if (label == "Parent Folder"){
			return '<div class="row miniButton">\
				    <div class="col col-lg-2">\
				        <div class = "divBox miniDivBoxFolder" id = "CreateFolder" data-toggle="modal" data-target="#modalCreateFolder">\
				            <i class="fa fa-plus" style="margin-right: 10px"></i>Create Folder\
				        </div>\
				    </div>\
				    <div class="col col-auto"></div>\
			</div>';
		}else if (label == "Folder"){
			return '<div class="row miniButton">\
				    <div class="col col-lg-2">\
				        <div class = "divBox miniDivBoxFolder" id = "CreateFolder" data-toggle="modal" data-target="#modalCreateFolder">\
				            <i class="fa fa-plus" style="margin-right: 10px"></i>Create Folder\
				        </div>\
				    </div>\
				    <div class="col col-lg-2">\
				        <div class = "divBox miniDivBoxFolder" id = "UploadFile"  data-toggle="modal" data-target="#modalUploadFile">\
				            <i class="fa fa-upload" style="margin-right: 10px"></i>Upload File\
				        </div>\
				    </div>\
				    <div class="col col-auto"></div>\
			</div>';
		}else{
			return '<div class="row miniButton">\
			    <div class="col col-lg-2">\
			        <div class = "divBox miniDivBoxMain" id = "'+id+'"  data-toggle="modal" data-target="#modal'+id+'">\
			            <i class="fa fa-plus" style="margin-right: 10px;"></i>'+label
				    +'</div>\
				    <div class="col col-auto"></div>\
				</div>';
		}
	}
	function divFile(id, name, type, folderName, starred = false){
		var displayStar = starred ? "" : "none";
		var designFile = MIMEIcon(type);
		return '<div id = "file-'+designFile[3]+'-'+id+'" class="divBox divFile file-'+designFile[3]+' file-'+folderName+'" >\
			        <i class="fa '+designFile[1]+'" style = "margin-right: 12px; font-size: 16px; color: '+designFile[2]+'"></i>'+name+'\
			        <img id = "img-file-'+id+'" src="../../Content/content_photos/loading-sm.gif" style="width: 20px; display: none;">\
		        	<i id = "fileStar-file-'+id+'" class="fa fa-star" style="color: #686868; display: '+displayStar+'"></i>\
	    		</div>';
	}
	function changeName(_Name, _id, _Icon = "fa-folder", _Color = "#e8af00", _Starred = false){
		var displayStar = _Starred ? "" : "none";
		var idStar = _Icon == "fa-folder" ? "folderStar-" : "fileStar-";
		idStar = idStar + _id;
		_Icon = 'fa '+ _Icon;
		_Color = "color: " + _Color;
		return '<i class="'+_Icon+'" style = "margin-right: 10px;  font-size: 16px; '+_Color+';"></i>' + _Name + 
				'<img id="img-'+_id+'" src="../../Content/content_photos/loading-sm.gif" style="width: 20px; display: none;">\
				<i  id = "'+idStar+'" class="fa fa-star" style="color: #686868; display: '+displayStar+';"></i>';
	}
	function changeModalBox(start, code, label, classCode){
		classType = classCode.includes("folder") ? "modalDIRFolder modalDIR" + classCode : "modalDIR" + classCode;
		return '<div id = "modalDIR-'+start+'" class="divBox '+classType+'" aria-code = "'+code+'">'+
				'<i class="fa fa-folder" style = "margin-right: 10px; font-size: 16px; color: #e8af00"></i>'+label
		        +'<img id = "imgModalDIR-'+start+'" src="../../Content/content_photos/loading-sm.gif" style="width: 25px; display: none;">\
		       </div><div id = "modalDIRContent-'+start+'" class = "modalDIRContent-'+classCode+'">\
		        </div>\
	        ';
	}
	function addName(id, label){
		return '<div id = "listName-'+id+'" class="divBox listName">\
            <i id = "listClose-'+id+'" class="fa fa-times-circle closeName" style = "margin-right: 10px; font-size: 16px; color: red"></i>'+label
            '</div>';
	}
//File Upload
	function AddFileUpload(id){
		return '<div class = "input-group-append uploadDiv" id = "uploadDiv-'+id+'">\
				<div class="custom-file col-sm-11">\
				    <input type="file" class="custom-file-input" id="customFile-'+id+'" name = "customFile[]" multiple>\
				    <label class="custom-file-label" for="customFile-'+id+'">Choose file</label>\
				</div>\
				<div class = "col-sm-1">\
				    <button type = "button" id = "btnRemoveFile-'+id+'" class="btnRemoveFile"><i class="fa fa-times-circle"></i></button>\
				</div></div>';
	}