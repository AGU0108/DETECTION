song = "";
objects = [];
status = "";

function preload()
{
	
}

function setup() {
  //1. CREATE A CANVAS:
  canvas = createCanvas(600,400);

  //2. SET THE CANVAS AT THE CENTER OF THE WEBPAGE:
  canvas.center();
  
  //3. SET THE WEBCAM VIDEO ON THE CANVAS CREATED:
  video = createCapture(VIDEO);
  video.size(600,400);
  video.hide();
  
  
  


  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  //4. SET AN IMAGE ACCORDING TO THE VIDEO ON TEH CANVAS:
   image(video,0,0,600,400);

  if(status != ""){
        //5. GENERATE R G B RANDOM NUMBERS:
        r = random(255);
        g = random(255);
        b = random(255);
        
        
        

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
 
          fill(r,g,b);
          text(objects[i].label, objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          //6. SET THE CONDITION TO CHECK IF THE OBJECT DETECTED IS A PERSON OR NOT:
          if( objects[i].label == "person") {
            document.getElementById("number_of_objects").innerHTML = "a baby is found";
             
            
          }

          else { document.getElementById("number_of_objects").innerHTML = "a baby is not found";
             
            
            
          }

         }

        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          
        }
      }
}
