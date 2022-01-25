<?php
	require_once 'methodStrToArr.php';

    function SideItemMenu($link, $div, $icon, $limit, $notif = false){
    	$level = $_SESSION["ORAS"]["ORAS_level"];
        if(in_array($level, StrToArr($limit, ",", ""))){
             echo '
                <li>
                    <a href="../../View/' . $link . '">
                        <i class="fa '.$icon.'"></i>
                        <span class="links_name">'.$div.notifBadge($notif).'</span>
                    </a>
                    <span class="tooltip">'.$div.'</span>
                </li>';
        }
    }
    function SideItemProfile($nameProfile, $posProfile){
         echo '<li class="profile">
                    <div class="profile-details">
                        <div class="name_job">
                            <div class="name">'.$nameProfile.'</div>
                            <div class="job">'.$posProfile.'</div>
                        </div>
                    </div>
                    <div>
                    <a href="../../View/Account/LogOut.php">
                        <i class="fa fa-sign-out" id="log_out" ></i>
                    </a>
                    </div>
                </li>';
    }
    function navHR(){
        echo '<hr class="hr-navbar">';
    }
    function notifBadge($boolNotif){
        session_start();
        // $level = $_SESSION["ORAS"]["ORAS_level"];
        if($boolNotif || $boolNotif == "true")
            return '<span class="badge badge-pill badge-danger badge-custom">*</span>';
    }
?>