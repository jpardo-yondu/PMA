function retrieveCurrentPoints(data){
	JSTable(data, "#tableCurrentPoints", ["date", "time", "h_name", "h_amount", "l_name", "l_amount"]);

	return true;
}

function retrieveWallet(data){
	JSTable(data, "#tableWallet", ["date", "time", "type", "gcash", "loading", "discrepancies"]);

	var labelsTopUp = [], labelsWithdraw = [];
	var dataWithdraw_G = [], dataTopUp_G = [];
	var dataWithdraw_L = [], dataTopUp_L = [];
	var dataDisc_W = [], dataDisc_T = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].type == "Top-Up"){
			dataTopUp_G.push(parseFloat(data[i].gcash));
			dataTopUp_L.push(parseFloat(data[i].loading));
			dataDisc_T.push(parseFloat(data[i].discrepancies));
			labelsTopUp.push(data[i].date + " " + data[i].time);
		}
		if (data[i].type == "Withdraw"){
			dataWithdraw_G.push(parseFloat(data[i].gcash));
			dataWithdraw_L.push(parseFloat(data[i].loading));
			dataDisc_W.push(parseFloat(data[i].discrepancies));
			labelsWithdraw.push(data[i].date + " " + data[i].time);
		}
	}
	var dataWithdraw = {
		labels: labelsWithdraw,
		datasets: [
			{
				label: 'Withdraw - GCash Logs',
				data: dataWithdraw_G,
				backgroundColor: "blue"

			},
			{
				label: 'Withdraw - Loading Logs',
				data: dataWithdraw_L,
				backgroundColor: "red"

			}
		]
	};

	var dataTopUp = {
		labels: labelsTopUp,
		datasets: [
			{
				label: 'Top-Up - GCash Logs',
				data: dataTopUp_G,
				backgroundColor: "blue"
			},
			{
				label: 'Top-Up - Loading Logs',
				data: dataTopUp_L,
				backgroundColor: "red"
			}
		]
	};

	var dataDisc = {
		labels: labelsWithdraw,
		datasets: [
			{
				label: 'Top-Up',
				data: dataDisc_T,
				backgroundColor: "blue"

			},
			{
				label: 'Withdraw',
				data: dataDisc_W,
				backgroundColor: "red"

			}
		]
	};

	var configWithdraw = {
		type: 'bar',
		data: dataWithdraw
	};

	var configTopUp = {
	  type: 'bar',
	  data: dataTopUp
	};

	var configDisc = {
	  type: 'line',
	  data: dataDisc
	};

	var chartStatusWithdraw = Chart.getChart("withdrawWallet"); 
	if (chartStatusWithdraw != undefined) {
	  chartStatusWithdraw.destroy();
	}
	var chartStatusTopup = Chart.getChart("topupWallet"); 
	if (chartStatusTopup != undefined) {
	  chartStatusTopup.destroy();
	}
	var chartStatusDiscrepancy = Chart.getChart("discrepancyWallet"); 
	if (chartStatusDiscrepancy != undefined) {
	  chartStatusDiscrepancy.destroy();
	}


	var withdrawChart = new Chart(
		document.getElementById('withdrawWallet'),
		configWithdraw
	);
	var topupChart = new Chart(
		document.getElementById('topupWallet'),
		configTopUp
	);
	var discChart = new Chart(
		document.getElementById('discrepancyWallet'),
		configDisc
	);

	return true;
}

function retrievePerPlayer(data){
	JSTable(data, "#tablePerPlayer", ["date", "time", "type", "count", "amount"]);

	var labelsAmount = [], labelsCount = [];
	var dataWithdraw_Count = [], dataWithdraw_Amount = [];
	var dataTopUp_Count = [], dataTopUp_Amount = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i].type == "Top-Up"){
			dataTopUp_Count.push(parseFloat(data[i].count));
			dataTopUp_Amount.push(parseFloat(data[i].amount));
			labelsAmount.push(data[i].date + " " + data[i].time);
		}
		if (data[i].type == "Withdraw"){
			dataWithdraw_Count.push(parseFloat(data[i].count));
			dataWithdraw_Amount.push(parseFloat(data[i].amount));
			labelsCount.push(data[i].date + " " + data[i].time);
		}
	}
	var dataCount = {
		labels: labelsCount,
		datasets: [
			{
				label: 'Top-Up',
				data: dataTopUp_Count,
				backgroundColor: "blue"

			},
			{
				label: 'Withdraw',
				data: dataWithdraw_Count,
				backgroundColor: "red"

			}
		]
	};

	var dataAmount = {
		labels: labelsAmount,
		datasets: [
			{
				label: 'Top-Up',
				data: dataTopUp_Amount,
				backgroundColor: "blue"
			},
			{
				label: 'Withdraw',
				data: dataWithdraw_Amount,
				backgroundColor: "red"
			}
		]
	};

	var configCount = {
		type: 'line',
		data: dataCount
	};

	var configAmount = {
		type: 'line',
		data: dataAmount
	};

	
	var chartStatusCount = Chart.getChart("player_count"); 
	if (chartStatusCount != undefined) {
	  chartStatusCount.destroy();
	}
	var chartStatusAmount = Chart.getChart("player_amount"); 
	if (chartStatusAmount != undefined) {
	  chartStatusAmount.destroy();
	}


	var countChart = new Chart(
		document.getElementById('player_count'),
		configCount
	);
	var amountChart = new Chart(
		document.getElementById('player_amount'),
		configAmount
	);

	return true;
}

function retrievePerTransaction(data){
	JSTable(data, "#tablePerTransaction", ["date", "time", "type", "amount"]);

	var labelsTopUp = [], labelsWithdraw = [];
	var dataWithdraw_Amount = [];
	var dataTopUp_Amount = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i].type == "Top-Up"){
			dataTopUp_Amount.push(parseFloat(data[i].amount));
			labelsTopUp.push(data[i].date + " " + data[i].time);
		}
		if (data[i].type == "Withdraw"){
			dataWithdraw_Amount.push(parseFloat(data[i].amount));
			labelsWithdraw.push(data[i].date + " " + data[i].time);
		}
	}
	var dataTopUp = {
		labels: labelsTopUp,
		datasets: [
			{
				label: 'Top-Up',
				data: dataTopUp_Amount,
				backgroundColor: "blue"

			}
		]
	};

	var dataWithdraw = {
		labels: labelsWithdraw,
		datasets: [
			{
				label: 'Withdraw',
				data: dataWithdraw_Amount,
				backgroundColor: "red"
			}
		]
	};

	var configTopUp = {
		type: 'line',
		data: dataTopUp
	};

	var configWithdraw = {
		type: 'line',
		data: dataWithdraw
	};

	
	var chartStatusWithdraw = Chart.getChart("withdraw_transaction"); 
	if (chartStatusWithdraw != undefined) {
	  chartStatusWithdraw.destroy();
	}
	var chartStatusTopUp = Chart.getChart("top_up_transaction"); 
	if (chartStatusTopUp != undefined) {
	  chartStatusTopUp.destroy();
	}


	var chartTopUp = new Chart(
		document.getElementById('withdraw_transaction'),
		configTopUp
	);
	var chartWithdraw = new Chart(
		document.getElementById('top_up_transaction'),
		configWithdraw
	);


	return true;
}

function retrievePerArena(data){
	JSTable(data, "#tablePerArena", ["date", "time", "type", "count", "amount"]);


	var labelsAmount = [], labelsCount = [];
	var dataWithdraw_Count = [], dataWithdraw_Amount = [];
	var dataTopUp_Count = [], dataTopUp_Amount = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i].type == "Top-Up"){
			dataTopUp_Count.push(parseFloat(data[i].count));
			dataTopUp_Amount.push(parseFloat(data[i].amount));
			labelsAmount.push(data[i].date + " " + data[i].time);
		}
		if (data[i].type == "Withdraw"){
			dataWithdraw_Count.push(parseFloat(data[i].count));
			dataWithdraw_Amount.push(parseFloat(data[i].amount));
			labelsCount.push(data[i].date + " " + data[i].time);
		}
	}
	var dataCount = {
		labels: labelsCount,
		datasets: [
			{
				label: 'Top-Up',
				data: dataTopUp_Count,
				backgroundColor: "blue"

			},
			{
				label: 'Withdraw',
				data: dataWithdraw_Count,
				backgroundColor: "red"

			}
		]
	};

	var dataAmount = {
		labels: labelsAmount,
		datasets: [
			{
				label: 'Top-Up',
				data: dataTopUp_Amount,
				backgroundColor: "blue"
			},
			{
				label: 'Withdraw',
				data: dataWithdraw_Amount,
				backgroundColor: "red"
			}
		]
	};

	var configCount = {
		type: 'line',
		data: dataCount
	};

	var configAmount = {
		type: 'line',
		data: dataAmount
	};

	
	var chartStatusCount = Chart.getChart("arena_count"); 
	if (chartStatusCount != undefined) {
	  chartStatusCount.destroy();
	}
	var chartStatusAmount = Chart.getChart("arena_amount"); 
	if (chartStatusAmount != undefined) {
	  chartStatusAmount.destroy();
	}


	var countChart = new Chart(
		document.getElementById('arena_count'),
		configCount
	);
	var amountChart = new Chart(
		document.getElementById('arena_amount'),
		configAmount
	);

	return true;
}

function retrieveWTO(data){
	JSTable(data, "#tableWTO", ["date", "time", "count", "amount"]);

	var labels = [];
	var dataCount_ = [];
	var dataAmount_ = [];

	for (var i = 0; i < data.length; i++) {
		dataCount_.push(parseFloat(data[i].count));
		dataAmount_.push(parseFloat(data[i].amount));
		labels.push(data[i].date + " " + data[i].time);
	}
	var dataCount = {
		labels: labels,
		datasets: [
			{
				label: 'Timeout Count',
				data: dataCount_,
				backgroundColor: "red"

			}
		]
	};

	var dataAmount = {
		labels: labels,
		datasets: [
			{
				label: 'Timeout Amount',
				data: dataAmount_,
				backgroundColor: "red"
			}
		]
	};

	var configCount = {
		type: 'line',
		data: dataCount
	};

	var configAmount = {
		type: 'line',
		data: dataAmount
	};

	
	var chartStatusCount = Chart.getChart("wto_count"); 
	if (chartStatusCount != undefined) {
	  chartStatusCount.destroy();
	}
	var chartStatusAmount = Chart.getChart("wto_amount"); 
	if (chartStatusAmount != undefined) {
	  chartStatusAmount.destroy();
	}


	var countChart = new Chart(
		document.getElementById('wto_count'),
		configCount
	);
	var amountChart = new Chart(
		document.getElementById('wto_amount'),
		configAmount
	);

	return true;
}
