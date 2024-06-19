status="";
objects=[];
function preload(){
    
}
function setup(){
    camera=createCapture(VIDEO);
    camera.hide();
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(camera,0,0,480,380);
    if(status != ""){
        objectDetector.detect(camera,gotResult);
        for(i=0; i<objects.length; i++){
percent=floor(objects[i].confidence*100);
fill("#FF0000");       
text(objects[i].label+" "+percent+"%", objects[i].x+15,objects[i].y+15 );
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if(objects[i].label==input){
    camera.stop();
    objectDetector.detect(gotResult);
    document.getElementById("objects").innerHTML=objects[i].label+" found"
    document.getElementById("status").innerHTML="Status:Object Detected";
synth=window.speechSynthesis;
speak=new SpeechSynthesisUtterance(objects[i].label+" found");
synth.speak(speak);


}  
}
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
    input=document.getElementById("input").value;
    console.log("start function is working");
}

function modelLoaded(){
console.log("model loaded");
status=true;

}