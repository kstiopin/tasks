<?php
require_once '../config/config_public.php';

$result = $mysqli->query("UPDATE tasks SET state = '".$_GET['state']."', done = NOW() WHERE `id` = ".$_GET['taskId']) or die($mysqli->error);

die($result);