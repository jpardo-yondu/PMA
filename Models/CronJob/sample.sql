BEGIN; #For Wallet Monitoring - if 2 PM the checking  is 3 PM

-- Gcash logs
;



-- Loading logs
;


;

END ;

BEGIN; #Timeout and Limits Monitoring (per hour) - if 2 PM the checking  is 3 PM

-- Highest Topup Amount Per Player
SELECT 'Highest Topup Amount Per Player' AS 'transaction', SUM(amount) AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'deposit'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to ORDER BY SUM(amount) DESC
LIMIT 1;

-- Highest Withdraw Amount Per Player
SELECT 'Highest Withdraw Amount Per Player' AS 'transaction', SUM(amount) AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'withdrawal'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to ORDER BY SUM(amount) DESC
LIMIT 1;

-- Highest Topup Count Per Player
SELECT 'Highest Topup Count Per Player' AS 'transaction', COUNT(id) AS 'count', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'deposit'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to 
ORDER BY COUNT(id) DESC
LIMIT 1;

-- Highest Withdraw Count Per Player
SELECT 'Highest Withdraw Count Per Player' AS 'transaction', COUNT(id) AS 'count', amount, DATE(created_at) AS 'DATE', "withdraw" AS TRANSACTION
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'withdrawal'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to 
ORDER BY COUNT(id) DESC
LIMIT 1;

END; 

BEGIN; #Timeout and Limits Monitoring (per transaction)  - if 2 PM the checking  is 3 PM

-- Highest Topup Amount Per Transaction
SELECT 'Highest Topup Amount Per Transaction' AS 'transaction', amount AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'deposit'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
ORDER BY amount DESC
LIMIT 1;

-- Highest Withdraw Amount Per Transaction
SELECT 'Highest Withdraw Amount Per Transaction' AS 'transaction', amount AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE created_At BETWEEN :From AND :To
AND transaction_type = 'withdrawal'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
ORDER BY amount DESC
LIMIT 1;

END;

BEGIN; #Timeout and Limits Monitoring (per arena) - if 2 PM the checking is also 2 PM
-- Highest Topup Count Per Player Per Arena
SELECT 'Highest Topup Count Per Player Per Arena' AS TRANSACTION, COUNT(id) AS 'count', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE arena_id = '94'
AND transaction_type = 'deposit'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to 
ORDER BY COUNT(id) DESC
LIMIT 1;

-- Highest Withdraw Count Per Player Per Arena
SELECT 'Highest Withdraw Count Per Player Per Arena' AS 'transaction', COUNT(id) AS 'count', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE arena_id = '94'
AND transaction_type = 'withdrawal'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to 
ORDER BY COUNT(id) DESC
LIMIT 1;

-- Highest Topup Amount Per Player Per Arena
SELECT 'Highest Topup Amount Per Player Per Arena' AS 'transaction', SUM(amount) AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE arena_id = 94
AND transaction_type = 'deposit'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to ORDER BY SUM(amount) DESC
LIMIT 1;

-- Highest Withdraw Amount Per Player Per Arena
SELECT 'Highest Withdraw Amount Per Player Per Arena' AS 'transaction', SUM(amount) AS 'amount', DATE(created_at) AS 'DATE'
FROM loading_logs
WHERE arena_id = 94
AND transaction_type = 'withdrawal'
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY load_to ORDER BY SUM(amount) DESC
LIMIT 1;

END; 

BEGIN; #Timeout and Limits Monitoring (withdrawal Monitoring)  - if 2 PM the checking  is 3 PM

SELECT "Bravo" AS "Site", 'WTO count' AS 'transaction', COUNT(DISTINCT(trans_ext_reference)) AS 'COUNT'
FROM gcash_logs 
WHERE created_at BETWEEN :From AND "2022-01-23 13:59:59"
AND query_status = "For Recon"
ORDER BY created_at ASC
LIMIT 10;

#Withdraw Timeout Amount /confirm API
SELECT "Bravo" AS "Site", 'WTO Amount' AS 'transaction', SUM(amount) AS 'amount'
FROM gcash_logs 
WHERE created_at BETWEEN :From AND "2022-01-23 13:59:59"
AND query_status = "For Recon"
AND api = 'https://access.mynt.xyz/xapi/2.0/partner-cashin/confirm'
ORDER BY created_at ASC
LIMIT 10;

END;

BEGIN; #For Emergency - for checking purposes only, not related in monitoring

-- for maitenance
SELECT HOUR(created_at) AS HOUR, COUNT(id) AS COUNT, "Bravo" /* Change to "Bravo" if checking on Bravo database */
FROM gcash_logs 
WHERE created_at > :From  /* change time of maintenance */
AND query_status = "For Recon" 
GROUP BY DATE(created_at), HOUR(created_at)
ORDER BY created_at ASC LIMIT 1000;

-- for checking if there has exceeded in limits
SELECT "Bravo", transaction_type, COUNT(id)
FROM loading_logs
WHERE arena_id = 94
AND ((transaction_type = 'deposit' AND amount > 100000) OR (transaction_type = 'withdrawal' AND amount > 20000))
AND gcash_log_id != '1'
AND gcash_log_id IS NOT NULL
AND load_to != '78'
GROUP BY transaction_type
LIMIT 2;


END
