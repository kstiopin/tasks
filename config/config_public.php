<?php
setlocale ("LC_TIME", "ru_RU");

require_once 'config_private.php';

/*
 * Block requests from ips not in the whitelist
 */
if (!in_array($_SERVER['REMOTE_ADDR'], $allowedIps)) {
    die($_SERVER['REMOTE_ADDR'].' not allowed');
}

// DB connection
$mysqli = new mysqli($db_host, $db_user, $db_password, $db_name);
$mysqli->set_charset("utf8");