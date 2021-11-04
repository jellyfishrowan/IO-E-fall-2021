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

    document.getElementById("title").innerHTML = "Sprint 3";
    document.getElementById("details").innerHTML = "handpose, shifted";
    
    {// ---------- Import Statements ----------
        //
    }
    
    {// ---------- Variable Declaration ----------
    
        //resolution (FHD: 1920/1080)(HRD: 1280/720)
        var cameraInput;
    
        var aspectRatio = 0.5625;
        var totalWidth;
        var totalHeight;
    
        var handpose;
        var handPose;
        var hand1, hand2, hand3, hand4, hand5, 
        hand6, hand7, hand8, hand9, hand10, 
        hand11, hand12, hand13, hand14, hand15, 
        hand16, hand17, hand18, hand19, hand20, 
        hand21;
        var handParts = [hand1, hand2, hand3, hand4, hand5, 
            hand6, hand7, hand8, hand9, hand10, 
            hand11, hand12, hand13, hand14, hand15, 
            hand16, hand17, hand18, hand19, hand20, 
            hand21];
        
    }
    
    {// ---------- Define Actions and dependancies ----------
        // preload = () => {}
        setup = () => {
            createCanvas(windowWidth, windowHeight);
            // frameRate(10); pixelDensity(1);
            cameraInput = createCapture(VIDEO);
            //cameraInput.size(1920, 1080);// 0.5625 is 16:9 aspect ratio
            cameraInput.size(windowWidth, windowHeight);
            cameraInput.hide();
    
            handpose = ml5.handpose(cameraInput, loadedML5);
            handpose.on('predict', function(results){
                handPose = results;
                handposeGetPoses();
            });
    
            for(let i = 0; i < handParts.length; i++){
                handParts[i] = createVector();
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
            handposeShowPoses();
        }
    }
    
    {// ---------- Define Tertiary Processes ----------
        function handposeGetPoses(){
            if(handPose.length > 0){// if person is in frame
                console.log(handPose);
                for(let i = 0; i < handPose[0].landmarks.length; i++){//go through keypoints
                    if(handPose[0].handInViewConfidence > 0.9){
                        handParts[i].x = lerp(handPose[0].landmarks[i][0], handParts[i].x, 0.8);
                        handParts[i].y = lerp(handPose[0].landmarks[i][1], handParts[i].y, 0.8);    
                        handParts[i].z = 1;
                    } else{
                        handParts[i].z = 0;
                    }
                }
            }
        }
    
        function handposeShowPoses(){
            for(let i = 0; i < handParts.length; i++){
                if(handParts[i].z == 1){
                    fill(255, 0, 0); noStroke();
                    ellipse(handParts[i].x, handParts[i].y, 5);
                    // for(let j = 1; j < handParts.length - 1; j++){
                    //     if (handParts[j].z == 1){
                    //         stroke(255, 0, 0); strokeWeight(0.5);
                    //         line(handParts[i].x, handParts[i].y, handParts[j].x, handParts[j].y);
                    //     }
                    // }
                }
            }
            // stroke(255,0,0);
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