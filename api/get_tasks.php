<?php
require_once '../config/config_public.php';

$result = [];
$r = $mysqli->query("SELECT * FROM tasks WHERE urgency < 8");
while ($f = $r->fetch_assoc()) {
    $f['details'] = nl2br($f['details']);
    $result[] = $f;
}

die(json_encode($result));