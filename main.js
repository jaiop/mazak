status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
    object = document.getElementById("name").value;
}
function modeLoaded()
{
    console.log("MODEL LOADED!");
    status = true;
}
function draw()
{
    image(video, 0, 0, 380, 380);
    if( status != "")
    {
      objectDetector.detect(video, gotResults);
      for(i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "status : detecting objects";
        
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " +percent + "%", objects[i].x +15, objects[i].y +15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object)
        {
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object_status").innerHTML = object + " found";
            Synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object+ "found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_status").innerHTML = object + " not found"
        }
      }
    }
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results
    }
}