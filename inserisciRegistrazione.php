<?php

    include "connessione.php";

    $nome=$_REQUEST['nome'];
    $cognome=$_REQUEST['cognome'];
    $ditta=$_REQUEST['ditta'];
    $tipo_documento=$_REQUEST['tipo_documento'];
    $n_documento=$_REQUEST['numero_documento'];
    $note=$_REQUEST['note'];

    $coronavirus_paesi_a_rischio=$_REQUEST['paesi_a_rischio'];
    $coronavirus_paese_a_rischio=$_REQUEST['coronavirus_paese_a_rischio'];
    $coronavirus_data_partenza_paese_a_rischio=$_REQUEST['coronavirus_data_partenza_paese_a_rischio'];
    if(strlen($coronavirus_data_partenza_paese_a_rischio)==0)
    {
        $coronavirus_data_partenza_paese_a_rischio="NULL";
    }
    else
    {
        $coronavirus_data_partenza_paese_a_rischio="'".$coronavirus_data_partenza_paese_a_rischio."'";
    }
    $coronavirus_esposizione_a_casi_accertati=$_REQUEST['esposizione_a_casi_accertati'];
    $coronavirus_esposizione_a_casi_sospetti=$_REQUEST['esposizione_a_casi_sospetti'];
    $coronavirus_esposizione_persone_paesi_a_rischio=$_REQUEST['esposizione_persone_paesi_a_rischio'];
    $coronavirus_esposizione_familiari_casi_a_rischio=$_REQUEST['esposizione_familiari_casi_a_rischio'];

    $query1="SELECT ISNULL(MAX(n_cartellino),0) AS n_cartellino FROM registrazioni_ospiti WHERE DATEPART(dd,[dataora_entrata])=DATEPART(dd,GETDATE())";
    $result1=sqlsrv_query($conn,$query1);
    if($result1==TRUE)
    {
        while($row1=sqlsrv_fetch_array($result1))
        {
            $n_cartellino=intval($row1['n_cartellino'])+1;
        }
        $query2="INSERT INTO [dbo].[registrazioni_ospiti]
                        ([nome]
                        ,[cognome]
                        ,[ditta]
                        ,[tipo_documento]
                        ,[n_documento]
                        ,[dataora_entrata]
                        ,[note]
                        ,[n_cartellino]
                        ,[coronavirus_paesi_a_rischio]
                        ,[coronavirus_paese_a_rischio]
                        ,[coronavirus_data_partenza_paese_a_rischio]
                        ,[coronavirus_esposizione_a_casi_accertati]
                        ,[coronavirus_esposizione_a_casi_sospetti]
                        ,[coronavirus_esposizione_persone_paesi_a_rischio]
                        ,[coronavirus_esposizione_familiari_casi_a_rischio])
                VALUES
                        ('$nome'
                        ,'$cognome'
                        ,'$ditta'
                        ,'$tipo_documento'
                        ,'$n_documento'
                        ,GETDATE()
                        ,'$note'
                        ,'$n_cartellino'
                        ,'$coronavirus_paesi_a_rischio'
                        ,'$coronavirus_paese_a_rischio'
                        ,$coronavirus_data_partenza_paese_a_rischio
                        ,'$coronavirus_esposizione_a_casi_accertati'
                        ,'$coronavirus_esposizione_a_casi_sospetti'
                        ,'$coronavirus_esposizione_persone_paesi_a_rischio'
                        ,'$coronavirus_esposizione_familiari_casi_a_rischio')";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            $responseArray["n_cartellino"]=$n_cartellino;
            $query3="SELECT MAX(id_registrazione) AS id_registrazione FROM registrazioni_ospiti";
            $result3=sqlsrv_query($conn,$query3);
            if($result3==TRUE)
            {
                while($row3=sqlsrv_fetch_array($result3))
                {
                    $responseArray["id_registrazione"]=$row3['id_registrazione'];
                }
                echo json_encode($responseArray);
            }
            else
                die("error");
        }
        else
            die("error".$query2);
    }
    else
        die("error");
?>