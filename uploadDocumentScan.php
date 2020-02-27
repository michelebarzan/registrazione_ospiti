<?php

    $document_scan = $_REQUEST['document_scan'];
    $fileName=$_REQUEST["fileName"];

    $path='files\\documents_scans\\';

    $document_scan = str_replace('data:image/png;base64,', '', $document_scan);
    $document_scan = str_replace(' ', '+', $document_scan);
    $fileData = base64_decode($document_scan);
    
    if(file_put_contents($path.$fileName, $fileData)===FALSE)
        die("error");
    else
        echo "ok";

?>