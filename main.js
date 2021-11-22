objects = [];
status = "";

function setup()
{
    canvas = createCanvas(480, 280);
    canvas.position(440, 310);
    video = createCapture(VIDEO);
    video.hide();
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;

}

function start()
{
   objectDetector = ml5.objectDetector('cocossd', modelLoaded)
   document.getElementById("status").innerHTML = ("Status: Detecting Objects");
    object_name = document.getElementById("textinput").value;
    
}

function gotResult(error, results)
{
    if(error)
    {
    console.log(error);
    }
    console.log(results);
    objects = results;

}

function draw()
{
    image(video,0,0, 480, 300);

    if( status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
        
            document.getElementById("status").innerHTML = "Status: Object detected";
            document.getElementById("no-of-objects-detected").innerHTML = "Number of detected objects are: "+ objects.length;
            fill("yellow");
                percent = floor(objects[0].confidence * 100);
            text(objects[i].label + " "+percent+ "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("purple");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name +" Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name +" Found"); 
                synth.speak(utterThis);        
              }
              else
              {              
                  document.getElementById("status").innerHTML = object_name +" Not found";
                  synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name +" Not found"); 
                synth.speak(utterThis);
              }
        }
}
}