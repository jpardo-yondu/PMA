<!DOCTYPE html>
<html>
<head>
    <?php
        error_reporting(E_ERROR);
        require_once '../../Models/Main/SessionSecure.php';
        require_once 'Initialization.php'; 
        echo '<title>'. $SystemName.'</title>';
    ?>
</head>
<body class = "body" >
    <section class="content-section">
        <div style = "padding-left: 20px">
            <?php  contentBody();?>
        </div>
    </section>
</body>
</html>

