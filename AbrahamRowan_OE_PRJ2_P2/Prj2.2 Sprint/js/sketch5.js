{/* ---------- Details ----------
    Title: Interactive Objects & Environments
    Purpose: handpose sprints
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

    document.getElementById("title").innerHTML = "Sprint 5";
    document.getElementById("details").innerHTML = "handpose drawing";
    alert("put your hand in the frame and hold spacebar to draw (based on your index finger), press backspace to clear the screen.");
    
    {// ---------- Import Statements ----------
        //
    }
    
    {// ---------- Variable Declaration ----------
    
        //resolution (FHD: 1920/1080)(HRD: 1280/720)
        var cameraInput;
    
        var aspectRatio = 0.5625;

        var manualOffsetHorizontal = 640;//consistently hits 630, regardless of window size
        var manualOffsetVertical = 480;//475 seems to be the max
        //640 and 480 pop up in examples

        // var handInViewConfidence;
    
        var handpose;
        var handPoseOutput = [];
        // var hand1, hand2, hand3, hand4, hand5, 
        // hand6, hand7, hand8, hand9, hand10, 
        // hand11, hand12, hand13, hand14, hand15, 
        // hand16, hand17, hand18, hand19, hand20, 
        // hand21;
        var handParts = []; handParts.length = 21;
        // var handParts = [hand1, hand2, hand3, hand4, hand5, 
        // hand6, hand7, hand8, hand9, hand10, 
        // hand11, hand12, hand13, hand14, hand15, 
        // hand16, hand17, hand18, hand19, hand20, 
        // hand21];

        var drawingArray = [];
        var drawingIsOn = false;
        
    }
    
    {// ---------- Define Actions and dependancies ----------
        // preload = () => {}
        setup = () => {
            
            createCanvas(windowWidth, windowHeight);
            // frameRate(30); pixelDensity(1);
            cameraInput = createCapture(VIDEO);
            //cameraInput.size(1920, 1080);// 0.5625 is 16:9 aspect ratio
            cameraInput.size(windowWidth, windowHeight);
    
            handpose = ml5.handpose(cameraInput, loadedML5);
            handpose.on('predict', function(results){
                handPoseOutput = results;
                handposeGetPoses();
            });
    
            for(let i = 0; i < handParts.length; i++){
                handParts[i] = createVector();
            }
            cameraInput.hide();
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
    
    
            // fill(255, 0, 0);
            handposeShowPoses();
            drawing();
            // stroke(255,0,0); strokeWeight(0.5);
            // line(500, 0, 500, windowHeight);
            // line(0, 500, windowWidth, 500);
        }
    }
    
    {// ---------- Define Tertiary Processes ----------
        function handposeGetPoses(){
            // console.log(handPoseOutput[0].handInViewConfidence);
            // handInViewConfidence = handPoseOutput[0].handInViewConfidence;
            if(handPoseOutput.length > 0){// if hand is in frame
                // console.log(handPoseOutput[0].handInViewConfidence);

                // console.log("coordinates test");
                // console.log("X("+Math.round(handPoseOutput[0].landmarks[8][0])+"/"+windowWidth+"), Y("+Math.round(handPoseOutput[0].landmarks[8][1])+"/"+windowHeight+")");
                for(let i = 0; i < handPoseOutput[0].landmarks.length; i++){//go through keypoints
                    if(handPoseOutput[0].handInViewConfidence > 0.9){
                        handParts[i].x = lerp(handPoseOutput[0].landmarks[i][0] * (windowWidth  / manualOffsetHorizontal), handParts[i].x, 0.8);
                        handParts[i].y = lerp(handPoseOutput[0].landmarks[i][1] * (windowHeight / manualOffsetVertical  ), handParts[i].y, 0.8);
                        // handParts[i].z = lerp(handPoseOutput[0].landmarks[i][2], handParts[i].z, 0.8);
                    }
                }
            }
        }
    
        function handposeShowPoses(){
            if(handPoseOutput.length > 0){
                
                // console.log(handPoseOutput[0].handInViewConfidence);
                // if(handPoseOutput[0].handInViewConfidence > 0.9){
                    for(let i = 0; i < handParts.length; i++){
                        fill(255, 0, 0); noStroke();
                        ellipse(handParts[i].x, handParts[i].y, 5);
                        // for(let j = 1; j < handParts.length - 1; j++){
                        //     stroke(255, 0, 0); strokeWeight(0.5);
                        //     line(handParts[i].x, handParts[i].y, handParts[j].x, handParts[j].y);
                        // }
                    }
                    stroke(0,255,0); strokeWeight(2);
                    line(handParts[0].x, handParts[0].y, handParts[1].x, handParts[1].y);
                    line(handParts[1].x, handParts[1].y, handParts[2].x, handParts[2].y);
                    line(handParts[2].x, handParts[2].y, handParts[3].x, handParts[3].y);
                    line(handParts[3].x, handParts[3].y, handParts[4].x, handParts[4].y);

                    
                    line(handParts[5].x, handParts[5].y, handParts[6].x, handParts[6].y);
                    line(handParts[6].x, handParts[6].y, handParts[7].x, handParts[7].y);
                    line(handParts[7].x, handParts[7].y, handParts[8].x, handParts[8].y);
                    
                    line(handParts[9].x, handParts[9].y, handParts[10].x, handParts[10].y);
                    line(handParts[10].x, handParts[10].y, handParts[11].x, handParts[11].y);
                    line(handParts[11].x, handParts[11].y, handParts[12].x, handParts[12].y);
                    
                    line(handParts[13].x, handParts[13].y, handParts[14].x, handParts[14].y);
                    line(handParts[14].x, handParts[14].y, handParts[15].x, handParts[15].y);
                    line(handParts[15].x, handParts[15].y, handParts[16].x, handParts[16].y);

                    line(handParts[17].x, handParts[17].y, handParts[18].x, handParts[18].y);
                    line(handParts[18].x, handParts[18].y, handParts[19].x, handParts[19].y);
                    line(handParts[19].x, handParts[19].y, handParts[20].x, handParts[20].y);

                    line(handParts[1].x, handParts[1].y, handParts[5].x, handParts[5].y);
                    line(handParts[2].x, handParts[2].y, handParts[5].x, handParts[5].y);
                    line(handParts[5].x, handParts[5].y, handParts[9].x, handParts[9].y);
                    line(handParts[9].x, handParts[9].y, handParts[13].x, handParts[13].y);
                    line(handParts[13].x, handParts[13].y, handParts[17].x, handParts[17].y);
                    line(handParts[17].x, handParts[17].y, handParts[0].x, handParts[0].y);
                // }
            }




            // 
            // line(handParts[0].x, handParts[0].y, handParts[1].x, handParts[1].y);
            // line(handParts[0].x, handParts[0].y, handParts[2].x, handParts[2].y);
            // line(handParts[1].x, handParts[1].y, handParts[3].x, handParts[3].y);
            // line(handParts[2].x, handParts[2].y, handParts[4].x, handParts[4].y);
            // line(handParts[5].x, handParts[5].y, handParts[6].x, handParts[6].y);
            // line(handParts[5].x, handParts[5].y, handParts[7].x, handParts[7].y);
            // line(handParts[6].x, handParts[6].y, handParts[8].x, handParts[8].y);
            // line(handParts[7].x, handParts[7].y, handParts[9].x, handParts[9].y);
            // line(handParts[8].x, handParts[8].y, handParts[10].x, handParts[10].y);
            // line(handParts[5].x, handParts[5].y, handParts[11].x, handParts[11].y);
            // line(handParts[6].x, handParts[6].y, handParts[12].x, handParts[12].y);
            // line(handParts[11].x, handParts[11].y, handParts[13].x, handParts[13].y);
            // line(handParts[12].x, handParts[12].y, handParts[14].x, handParts[14].y);
            // line(handParts[13].x, handParts[13].y, handParts[15].x, handParts[15].y);
            // line(handParts[14].x, handParts[14].y, handParts[16].x, handParts[16].y);
        }
        function drawing(){
            if(drawingIsOn){
                drawingArray[drawingArray.length] = {
                    x: handParts[8].x,
                    y: handParts[8].y
                }
            }
            // stroke(255, 255, 0); strokeWeight(4);
            fill(255, 0, 0); noStroke();
            for(let i = 0; i < drawingArray.length; i++){
                //start at 0 if drawing ellipses, 1 if drawing lines
                circle(drawingArray[i].x, drawingArray[i].y, 10);
                // line(drawingArray[i-1].x, drawingArray[i-1].y, drawingArray[i].x, drawingArray[i].y);
            }
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
        function keyPressed(){
            // console.log("keyPressed("+key+")");
            if(key == " "){
                console.log("keyPressed(SPACE)");
                drawingIsOn = true;
            }
        }

        function keyReleased(){
            if(key == " "){
                console.log("keyReleased(SPACE)");
                drawingIsOn = false;
            }
            if(key == "Backspace"){
                console.log("keyReleased(Backspace)");
                drawingArray = [];
            }
        }
    }
    
    {// ---------- Upon Exiting Page ----------
        //https://www.w3schools.com/jsref/event_onunload.asp
    }