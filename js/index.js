function getEnterExitPopup()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","enter-exit-popup-outer-container")

    var enterButton=document.createElement("button");
    enterButton.setAttribute("class","enter-exit-popup-button");
    enterButton.setAttribute("style","background-color:#70B085");
    enterButton.setAttribute("onclick","Swal.close();");
    var span=document.createElement("span");
    span.innerHTML="I'M ENTERING";
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-sign-in-alt");
    enterButton.appendChild(span);
    enterButton.appendChild(i);
    outerContainer.appendChild(enterButton);

    var exitButton=document.createElement("button");
    exitButton.setAttribute("class","enter-exit-popup-button");
    exitButton.setAttribute("style","background-color:#DA6969");
    exitButton.setAttribute("onclick","getLeavingPopup()");
    var span=document.createElement("span");
    span.innerHTML="I'M LEAVING";
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-sign-out-alt");
    exitButton.appendChild(span);
    exitButton.appendChild(i);
    outerContainer.appendChild(exitButton);

    Swal.fire
    ({
        width:600,
        icon:"question",
        title:"Welcome",
        html: outerContainer.outerHTML,
        allowOutsideClick:false,
        showConfirmButton:false,
        allowEscapeKey:false,
    });
}
function getLeavingPopup()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","enter-exit-popup-outer-container")

    var leavingPopupTitle=document.createElement("div");
    leavingPopupTitle.setAttribute("class","leaving-popup-title");
    var span=document.createElement("span");
    span.innerHTML="LEAVING";
    var i=document.createElement("i");
    i.setAttribute("class","fad fa-sign-out-alt");
    leavingPopupTitle.appendChild(span);
    leavingPopupTitle.appendChild(i);
    outerContainer.appendChild(leavingPopupTitle);

    var div=document.createElement("div");
    div.setAttribute("class","leaving-popup-row");
    div.setAttribute("style","text-align:center");
    div.innerHTML="Please leave your badge in the appropriate container and enter its number";
    outerContainer.appendChild(div);

    var div=document.createElement("div");
    div.setAttribute("class","leaving-popup-row");
    div.setAttribute("style","margin-top:15px;margin-bottom:10px;");

    var input=document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("id","leavingPopupInput");
    div.appendChild(input);

    var button=document.createElement("button");
    button.setAttribute("id","leavingPopupButton");
    button.setAttribute("onclick","chiudiRegistrazione()");
    var span=document.createElement("span");
    span.innerHTML="CONFIRM";
    var i=document.createElement("i");
    i.setAttribute("class","fal fa-check-circle");
    i.setAttribute("id","leavingPopupButtonIcon");
    button.appendChild(span);
    button.appendChild(i);
    
    div.appendChild(button);

    outerContainer.appendChild(div);

    Swal.fire
    ({
        width:600,
        html: outerContainer.outerHTML,
        allowOutsideClick:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCloseButton:true,
        onOpen:function()
        {
            document.getElementById("leavingPopupInput").focus();
        }
    }).then((result) => {
        location.reload();
      });;
}
function chiudiRegistrazione()
{
    document.getElementById("leavingPopupButtonIcon").className="fad fa-spinner-third fa-spin";
    var n_cartellino=document.getElementById("leavingPopupInput").value;
    $.post("chiudiRegistrazione.php",
    {
        n_cartellino
    },
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title: 'Error',
                    text: "If the problem persists, contact the staff",
                    showConfirmButton:false,
                });
                console.log(response);
            }
            else
            {
                Swal.fire
                ({
                    icon:"success",
                    title: 'Thank you for visiting',
                    timer: 6000,
                    showConfirmButton:false,
                    timerProgressBar: true,
                    onBeforeOpen: () => 
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="gray";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="18px";
                    }
                }).then((result) => {
                    location.reload();
                  });
            }
        }
        else
        {
            Swal.fire
            ({
                icon: 'error',
                title: 'Error',
                text: "If the problem persists, contact the staff",
                showConfirmButton:false,
            });
            console.log(status);
        }
    });
}
function startTime() 
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeContainer').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i)
{
    if (i < 10) {i = "0" + i};
        return i;
}
function submitForm(form,event)
{
    event.preventDefault();

    var button=document.getElementById("formConfirmButton");
    button.disabled=true;
    var buttonIcon=document.getElementById("formConfirmButtonIcon");
    buttonIcon.setAttribute("class","fad fa-spinner-third fa-spin");

    var nome=document.getElementById("nome").value;
    var cognome=document.getElementById("cognome").value;
    var ditta=document.getElementById("ditta").value;
    var tipo_documento=document.getElementById("tipo_documento").value;
    var numero_documento=document.getElementById("numero_documento").value;
    var note=document.getElementById("note").value;

    var document_scan;
    if(enableScan)
    {
        var document_scan_blank=isCanvasBlank();
        if(!document_scan_blank)
            var document_scan = canvas.toDataURL();
    }
    else
    {
        var document_scan_blank=true;
    }

    var radio_paesi_a_rischio = document.getElementsByName('radio_paesi_a_rischio');
    for (var i = 0, length = radio_paesi_a_rischio.length; i < length; i++)
    {
        if (radio_paesi_a_rischio[i].checked)
        {
            var paesi_a_rischio=radio_paesi_a_rischio[i].value;
            break;
        }
    }
    if(paesi_a_rischio.indexOf("No")>-1)
    {
        var coronavirus_paese_a_rischio="";
        var coronavirus_data_partenza_paese_a_rischio="";
    }
    else
    {
        var coronavirus_paese_a_rischio=document.getElementById("coronavirus_paese_a_rischio").value;
        var coronavirus_data_partenza_paese_a_rischio=document.getElementById("coronavirus_data_partenza_paese_a_rischio").value;
    }
    var radio_esposizione_a_casi_accertati = document.getElementsByName('radio_esposizione_a_casi_accertati');
    for (var i = 0, length = radio_esposizione_a_casi_accertati.length; i < length; i++)
    {
        if (radio_esposizione_a_casi_accertati[i].checked)
        {
            var esposizione_a_casi_accertati=radio_esposizione_a_casi_accertati[i].value;
            break;
        }
    }
    var radio_esposizione_a_casi_sospetti = document.getElementsByName('radio_esposizione_a_casi_sospetti');
    for (var i = 0, length = radio_esposizione_a_casi_sospetti.length; i < length; i++)
    {
        if (radio_esposizione_a_casi_sospetti[i].checked)
        {
            var esposizione_a_casi_sospetti=radio_esposizione_a_casi_sospetti[i].value;
            break;
        }
    }
    var radio_esposizione_persone_paesi_a_rischio = document.getElementsByName('radio_esposizione_persone_paesi_a_rischio');
    for (var i = 0, length = radio_esposizione_persone_paesi_a_rischio.length; i < length; i++)
    {
        if (radio_esposizione_persone_paesi_a_rischio[i].checked)
        {
            var esposizione_persone_paesi_a_rischio=radio_esposizione_persone_paesi_a_rischio[i].value;
            break;
        }
    }
    var radio_esposizione_familiari_casi_a_rischio = document.getElementsByName('radio_esposizione_familiari_casi_a_rischio');
    for (var i = 0, length = radio_esposizione_familiari_casi_a_rischio.length; i < length; i++)
    {
        if (radio_esposizione_familiari_casi_a_rischio[i].checked)
        {
            var esposizione_familiari_casi_a_rischio=radio_esposizione_familiari_casi_a_rischio[i].value;
            break;
        }
    }

    $.post("inserisciRegistrazione.php",
    {
        nome,
        cognome,
        ditta,
        tipo_documento,
        numero_documento,
        note,
        paesi_a_rischio,
        coronavirus_paese_a_rischio,
        coronavirus_data_partenza_paese_a_rischio,
        esposizione_a_casi_accertati,
        esposizione_a_casi_sospetti,
        esposizione_persone_paesi_a_rischio,
        esposizione_familiari_casi_a_rischio
    },
    function(response, status)
    {
        if(status=="success")
        {
            button.disabled=false;
            buttonIcon.setAttribute("class","fad fa-paper-plane");
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire
                ({
                    icon: 'error',
                    title: 'Error',
                    text: "If the problem persists, contact the staff",
                    showConfirmButton:false,
                });
                console.log(response);
            }
            else
            {
                var responseArray=JSON.parse(response);
                let n_cartellino=responseArray["n_cartellino"];
                let id_registrazione=responseArray["id_registrazione"];

                var alertImage="";
                if(!document_scan_blank)
                {
                    if(nome=="" || cognome=="")
                        var fileName="#"+id_registrazione+".png";
                    else
                        var fileName="#"+id_registrazione+"_"+nome+"_"+cognome+".png";
                    var data= new FormData();
                    data.append('document_scan',document_scan);
                    data.append('fileName',fileName);
                    $.ajax(
                    {
                        url:'uploadDocumentScan.php',
                        data:data,
                        processData:false,
                        contentType:false,
                        type:'POST',
                        success:function(response)
                            {
                                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                                    alertImage='<br><span style="color:#E9A93A">Your scan was not uploaded. Please report it to the staff</span>';
                            }
                    });
                }

                Swal.fire
                ({
                    icon:"success",
                    title: 'Registration confirmed',
                    html: '<div id="badgeNumberInfoContainer"><span>Your badge number is </span><div id="badgeNumberInfo">'+n_cartellino+'</div></div>'+alertImage,
                    timer: 50000,
                    showConfirmButton:false,
                    timerProgressBar: true,
                    onBeforeOpen: () => 
                    {
                        document.getElementsByClassName("swal2-title")[0].style.color="gray";
                        document.getElementsByClassName("swal2-title")[0].style.fontSize="18px";
                    }
                }).then((result) => {
                    location.reload();
                  });
            }
        }
        else
        {
            button.disabled=false;
            buttonIcon.setAttribute("class","fad fa-paper-plane");
            Swal.fire
            ({
                icon: 'error',
                title: 'Error',
                text: "If the problem persists, contact the staff",
                showConfirmButton:false,
            });
            console.log(status);
        }
    });
}
function isCanvasBlank()
{
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
}