status="";
results_array=[];

function preload(){
    img=loadImage("dog.webp");
}

function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    detector=ml5.objectDetector('cocossd',modelloaded);
}

function draw(){
    image(video,0,0,350,350);
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255)
        for(var i=0;i<results_array.length;i++){
            name=results_array[i].label;
            percentage=floor(results_array[i].confidence*100);
            x=results_array[i].x-20;
            y=results_array[i].y-20;
            fill(r,g,b);
            text(name+" "+percentage+"%",x+20,y+20);
            noFill();
            stroke(r,g,b);
            height=results_array[i].height;
            width=results_array[i].width;
            rect(x,y,width,height);
            document.getElementById("object_quantity").innerHTML="Number of objects detected = "+results_array.length;
        }
    }
}

function modelloaded(){
    console.log("Yay ! Your First CoCoSsd Model Is Inesalised");
    status=true;
    detector.detect(video,getResults);
    document.getElementById("status").innerHTML="Status = Detecting Object";
}

function getResults(error,results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        results_array=results;
    }
}