<?php

    include "connessione.php";

    $n_cartellino=$_REQUEST['n_cartellino'];

    $query1="UPDATE registrazioni_ospiti SET dataora_uscita = GETDATE() WHERE n_cartellino=$n_cartellino AND DATEPART(dd,[dataora_entrata])=DATEPART(dd,GETDATE())";
    $result1=sqlsrv_query($conn,$query1);
    if($result1==TRUE)
    {
        echo "ok";
    }
    else
        die("error");
?>