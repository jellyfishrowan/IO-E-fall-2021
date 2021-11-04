{/* ---------- Details ----------
    Title: Interactive Objects & Environments
    Purpose: Posenet sprints
    Code Version: NA
    Availability: Phoenix, Github
    Creator: Rowan Abraham*/}

{// ---------- Learning Resources ----------

    {/* ---------- JS Reference ----------
    https://p5js.org/reference/*/}

    {/* ---------- Section ----------
        Text
        Link*/}
}

document.getElementById("title").innerHTML = "Sprint 2";
document.getElementById("details").innerHTML = "Persisting ML5 model";

{// ---------- Import Statements ----------
    //
}

{// ---------- Variable Declaration ----------

    //resolution (FHD: 1920/1080)(HRD: 1280/720)
    var cameraInput;

    var aspectRatio = 0.5625;
    var totalWidth;
    var totalHeight;

    var poseNet;
    var bodyPoses = [];
    var nose, leftEye, rightEye, leftEar, rightEar, leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist, leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle;
    var bodyParts = [
        nose, 
        leftEye, 
        rightEye, 
        leftEar, 
        rightEar, 
        leftShoulder, 
        rightShoulder, 
        leftElbow, 
        rightElbow, 
        leftWrist, 
        rightWrist, 
        leftHip, 
        rightHip, 
        leftKnee, 
        rightKnee, 
        leftAnkle, 
        rightAnkle
    ];


    var handPose;
    var handPoses = [];



    /* var nose; */
}

{// ---------- Define Actions and dependancies ----------
    // preload = () => {}
    setup = () => {
        createCanvas(windowWidth, windowHeight);
        frameRate(10); pixelDensity(1);
        cameraInput = createCapture(VIDEO);
        //cameraInput.size(1920, 1080);// 0.5625 is 16:9 aspect ratio
        cameraInput.size(windowWidth, windowHeight);
        cameraInput.hide();

        poseNet = ml5.poseNet(cameraInput, {outputStride:8, quantBytes:4}, loadedML5);
        poseNet.on('pose', function(results){
            bodyPoses = results;
            poseNetGetPoses();
        });

        for(let i = 0; i < bodyParts.length; i++){
            bodyParts[i] = createVector();
        }
    }
}

{// ---------- Define Main Sequence(s) ----------
    //
}

{// ---------- Define Main Loop(s) ----------
    draw = () => {
        clear();

        translate(windowWidth, 0); scale(-1, 1);//cameraInput is reversed, so translate and reflect image
        image(cameraInput, 0, 0, windowWidth, windowHeight);
        // translate(-windowWidth, 0); scale(-1, 1);//return canvas to normal


        fill(255, 0, 0);
        poseNetShowPoses();
    }
}

{// ---------- Define Tertiary Processes ----------
    function poseNetGetPoses(){
        if(bodyPoses.length > 0){// if person is in frame
            //
            for(let i = 0; i < bodyPoses[0].pose.keypoints.length; i++){//go through keypoints
                //
                // if(bodyPoses[0].pose.keypoints[i].score > 0.1){
                    bodyParts[i].x = lerp(bodyPoses[0].pose.keypoints[i].position.x, bodyParts[i].x, 0.8);
                    bodyParts[i].y = lerp(bodyPoses[0].pose.keypoints[i].position.y, bodyParts[i].y, 0.8);
                    // // bodyParts[i].x = bodyPoses[0].pose.keypoints[i].position.x;
                    // // bodyParts[i].y = bodyPoses[0].pose.keypoints[i].position.y;

                    // bodyParts[i].z = 1;
                    // // circle(bodyParts[i].x, bodyParts[i].y, 5);
                // }
                // else{
                //     bodyParts[i].z = 0;
                // }
            }
        }
    }

    function poseNetShowPoses(){
        for(let i = 0; i < bodyParts.length; i++){
            if(bodyParts[i].z == 1){
                fill(255, 0, 0); noStroke();
                ellipse(bodyParts[i].x, bodyParts[i].y, 5);
                // for(let j = 1; j < bodyParts.length - 1; j++){
                //     if (bodyParts[j].z == 1){
                //         stroke(255, 0, 0); strokeWeight(0.5);
                //         line(bodyParts[i].x, bodyParts[i].y, bodyParts[j].x, bodyParts[j].y);
                //     }
                // }
            }
        }
        stroke(255,0,0);
        line(bodyParts[0].x, bodyParts[0].y, bodyParts[1].x, bodyParts[1].y);
        line(bodyParts[0].x, bodyParts[0].y, bodyParts[2].x, bodyParts[2].y);
        line(bodyParts[1].x, bodyParts[1].y, bodyParts[3].x, bodyParts[3].y);
        line(bodyParts[2].x, bodyParts[2].y, bodyParts[4].x, bodyParts[4].y);
        line(bodyParts[5].x, bodyParts[5].y, bodyParts[6].x, bodyParts[6].y);
        line(bodyParts[5].x, bodyParts[5].y, bodyParts[7].x, bodyParts[7].y);
        line(bodyParts[6].x, bodyParts[6].y, bodyParts[8].x, bodyParts[8].y);
        line(bodyParts[7].x, bodyParts[7].y, bodyParts[9].x, bodyParts[9].y);
        line(bodyParts[8].x, bodyParts[8].y, bodyParts[10].x, bodyParts[10].y);
        line(bodyParts[5].x, bodyParts[5].y, bodyParts[11].x, bodyParts[11].y);
        line(bodyParts[6].x, bodyParts[6].y, bodyParts[12].x, bodyParts[12].y);
        line(bodyParts[11].x, bodyParts[11].y, bodyParts[13].x, bodyParts[13].y);
        line(bodyParts[12].x, bodyParts[12].y, bodyParts[14].x, bodyParts[14].y);
        line(bodyParts[13].x, bodyParts[13].y, bodyParts[15].x, bodyParts[15].y);
        line(bodyParts[14].x, bodyParts[14].y, bodyParts[16].x, bodyParts[16].y);
    }
}

{// ---------- Active Testing ----------
    //
}

{// ---------- Backup Testing ----------
    //
}

{// ---------- Upon entering page ----------
    //https://www.w3schools.com/jsref/event_onload.asp

    function loadedML5(){
        console.log("ML5 is active");
    }
}

{// ---------- While Running Page ----------
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    function windowResized(){
        resizeCanvas(windowWidth, windowHeight);
        cameraInput.size(windowWidth, windowHeight);
    }
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}