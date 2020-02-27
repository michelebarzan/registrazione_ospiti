<?php
$serverName = '192.168.69.7';
$connectionInfo=array("Database"=>"registrazioni_ospiti", "UID"=>"sa", "PWD"=>"Oasis2015");
$conn = sqlsrv_connect($serverName,$connectionInfo);
?>