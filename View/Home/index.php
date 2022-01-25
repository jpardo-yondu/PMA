<?php
    $page_title = 'homepage';
    require_once '../Shared/Master.php';
    function contentBody(){
        // echo "<h2 style = 'text-align: center; margin-top: 30px; margin-bottom: 50px; letter-spacing: 8px'>PITMASTERS MONITORING AUTOMATION (PMA)</h2>";
        PageHeader("Filter", "3","0px", "40px"); 
        form("formFilter", "", false, function(){
            colDiv(function(){
                SelectHTML("Database", "filterDB", ["1","2"], ["Alpha", "Bravo"], "2");
                SelectHTML(
                    "Type", "filterType", ["CurrentPoints","Wallet","PerPlayer","PerTransaction","PerArena","WTO"],  ["User Current Points", "Wallet Monitoring", "Top-up/Withdraw Per Player", "Top-up/Withdraw Per Transaction", "Top-up/Withdraw Per Arena", "Withdrawal Timeout"], "3");

                TextBox("From", "filterFrom", "date", "3");
                TextBox("To", "filterTo", "date", "3");

                button("buttonFilter", "Search", "1", "margin-top: 55px; font-weight: 600");
            });
        });

        Div(function(){
            PageHeader("Data", "3","40px", "40px", "divData"); 

            Div(function(){
                table("tableCurrentPoints", ["Date", "Time", "Name", "Highest Current Points", "Name", "Lowest Current Points"], ["14%", "10%", "13%", "20%", "13%", "20%"]);
            }, "divCurrentPoints",  "hidden", "divDataTable");

            Div(function(){
                table("tableWallet", ["Date", "Time", "Transaction", "Gcash Logs", "Loading Logs", "Discrepancies"], ["15%", "10%", "15%", "20%", "20%", "20%"]);
            }, "divWallet",  "hidden", "divDataTable");

            Div(function(){
                table("tablePerPlayer", ["Date", "Time", "Transaction", "Highest Count", "Highest Amount"], ["20%", "20%", "20%", "20%", "20%"]);
            }, "divPerPlayer",  "hidden", "divDataTable");

            Div(function(){
                table("tablePerTransaction", ["Date", "Time", "Transaction", "Highest Amount"], ["25%", "25%", "25%", "25%"]);
            }, "divPerTransaction",  "hidden", "divDataTable");

            Div(function(){
                table("tablePerArena", ["Date", "Time", "Transaction", "Highest Count", "Highest Amount"], ["20%", "20%", "20%", "20%", "20%"]);
            }, "divPerArena",  "hidden", "divDataTable");

            Div(function(){
                table("tableWTO", ["Date", "Time", "Count", "Amount"], ["25%", "25%", "25%", "25%"]);
            }, "divWTO",  "hidden", "divDataTable");

        }, "divData",  "hidden");


        Div(function(){
            Div(function(){
                PageHeader("Lowest Current Points", "3","20px", "30px");
                chart("lowestCurrentPoints", 12);

                PageHeader("Highest Current Points", "3","20px", "30px");
                chart("HighestCurrentPoints", 12);
            }, "divCurrentPoints_summary",  "hidden", "divSummaryChart");

            Div(function(){
                PageHeader("Withdraw", "3","20px", "30px");
                chart("withdrawWallet", 12);

                PageHeader("Top Up", "3","20px", "30px");
                chart("topupWallet", 12);
                
                PageHeader("Discrepancy", "3","20px", "30px");
                chart("discrepancyWallet", 12);
            }, "divWallet_summary",  "hidden", "divSummaryChart");

            Div(function(){
                PageHeader("Highest Count Per Player", "3","20px", "30px");
                chart("player_count",12);

                PageHeader("Highest Amount Per Player", "3","20px", "30px");
                chart("player_amount",12);
            }, "divPerPlayer_summary",  "hidden", "divSummaryChart");

            Div(function(){
                PageHeader("Highest Topup Amount Per Transaction", "3","20px", "30px");
                chart("withdraw_transaction",12);

                PageHeader("Highest Withdraw Amount Per Transaction", "3","20px", "30px");
                chart("top_up_transaction",12);
            }, "divPerTransaction_summary",  "hidden", "divSummaryChart");

            Div(function(){
                PageHeader("Highest Count Per Arena", "3","20px", "30px");
                chart("arena_count",12);

                PageHeader("Highest Amount Per Arena", "3","20px", "30px");
                chart("arena_amount",12);
            }, "divPerArena_summary",  "hidden", "divSummaryChart");

            Div(function(){
                PageHeader("Withdrawal Timeout Count", "3","20px", "30px");
                chart("wto_count",12);

                PageHeader("Withdrawal Timeout Amount", "3","20px", "30px");
                chart("wto_amount",12);
            
            }, "divWTO_summary",  "hidden", "divSummaryChart");
        }, "divSummary",  "hidden");

        Script(array_pop(explode("\\", __DIR__)), function($parent){
            ScriptLink("buttonFilter.js", $parent);
            ScriptLink("RetrieveFilter.js", $parent);
        });


    } 

?>