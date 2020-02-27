var enableScan;
var player;
var canvas;
var context;
var captureButton;
var startButton;
var stopButton;
var constraints = {
    video: true,
};
function getScan()
{
    if(enableScan)
    {
        player = document.getElementById('videoPlayer');
        canvas = document.getElementById('capureOutputCanvas');
        context = canvas.getContext('2d');
        captureButton = document.getElementById('captureButton');
        startButton = document.getElementById('startButton');
        stopButton = document.getElementById('stopButton');

        startButton.addEventListener('click', () => {
            $("#documentScanPreview").show("fast","swing");
            document.getElementById("documentScanPreview").style.display="flex";
            document.getElementById("scanSuggestionContainer").innerHTML='Put your document under the scanner and press scan';
        });
        stopButton.addEventListener('click', () => {
            captureButton.innerHTML='<span>SCAN</span><i class="fad fa-camera-alt"></i>';
            document.getElementById("scanSuggestionContainer").innerHTML="";
            $("#captureOutputCanvasHint").show("fast","swing");
            $("#capureOutputCanvas").hide("fast","swing");
            $("#documentScanPreview").hide("fast","swing");
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        // Attach the video stream to the video element and autoplay.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => 
        {
            player.srcObject = stream;
        });
    }
    
}
function scan()
{
    if($("#documentScanPreview").is(":hidden"))
    {
        $("#documentScanPreview").show("fast","swing");
        document.getElementById("documentScanPreview").style.display="flex";
        document.getElementById("scanSuggestionContainer").innerHTML='Put your document under the scanner and press scan';
    }
    captureButton.innerHTML='<span>REPEAT SCAN</span><i class="fad fa-camera-alt"></i>';
    $("#captureOutputCanvasHint").hide("fast","swing");
    $("#capureOutputCanvas").show("fast","swing");
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
}