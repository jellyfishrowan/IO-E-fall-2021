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

    document.getElementById("title").innerHTML = "Sprint 4";
    document.getElementById("details").innerHTML = "handpose, adjusted";
    
    {// ---------- Import Statements ----------
        //
    }
    
    {// ---------- Variable Declaration ----------
        //resolution (FHD: 1920/1080)(HRD: 1280/720)
        var cameraInput;
        var aspectRatio = 0.5625;
    }
    
    {// ---------- Define Actions and dependancies ----------
        // preload = () => {}
        setup = () => {
            createCanvas(windowWidth, windowHeight);
            // frameRate(30); pixelDensity(1);
            cameraInput = createCapture(VIDEO);
            cameraInput.size(windowWidth, windowHeight);//cameraInput.size(1920, 1080);// 0.5625 is 16:9 aspect ratio
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
        }
    }
    
    {// ---------- Define Tertiary Processes ----------
        //
    }
    
    {// ---------- Active Testing ----------
        //
    }
    
    {// ---------- Backup Testing ----------
        //
    }
    
    {// ---------- Upon entering page ----------
        //https://www.w3schools.com/jsref/event_onload.asp
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