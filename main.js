prediction = "";
prediction_1 = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_qaulity:90
}); 

camera =document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4lYryrpAg/model.json',modelLoaded);
function modelLoaded(){
console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data= "The first predection - " + prediction;
    speak_data_1= "The second predection - " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data + speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.error(error);
    }
    else 
    {
        console.log(results);
        document.getElementById("result_emotion_name0").innerHTML = results[0].label;
        document.getElementById("result_emotion_name1").innerHTML = results[1].label;
        prediction= results[0].label;
        prediction_1=results[1].label;
        speak();
        if(results[0].label == "Peace")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    
        if(results[0].label == "Thumbs up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        
        if(results[0].label == "voila")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }


        if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
    
        if(results[1].label == "Thumbs up")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
        }
        
        if(results[1].label == "voila")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }
    }
}

