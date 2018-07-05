<?php
require_once '../config/config_public.php';

$result = [];
$r = $mysqli->query("SELECT * FROM `tasks`");
while ($f = $r->fetch_assoc()) {
    $result[] = $f;
}

die(json_encode($result));