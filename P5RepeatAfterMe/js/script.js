{/* ---------- Details ---------- 
    Template Creator: Rowan Abraham
    Title: Repeat After Me
    Purpose: Vocal play exercise
    Code Version: 1.0
    Availability: <Location>
    Creator: Rowan Abraham*/}

{// ---------- Learning Resources ----------

    {/* ---------- Javascript best practices ---------- 
    Avoid Global Variables, always declare local variables https://medium.com/@josephcardillo/the-difference-between-function-and-block-scope-in-javascript-4296b2322abe
    Never declare number, string, or boolean objects; instead treat them as primitives
    Don't use new Object(); {} > new Object; "" > new String; 0 > new Number(); false > new Boolean(); [] > new Array(); /()/ > new RegExp(); function(){} > new Function()
    Be aware of automatic type conversions
    Use === comparison
    Create defaults in case your parameters are missing; function thisFunction(a=1, b=2){};
    Always end your switch with a default
    Avoid using eval(), it is outdated and poses a security risk
    https://www.w3schools.com/js/js_best_practices.asp*/}

    {/* ---------- JS Reference ---------- 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference*/}

    {/* ---------- JS Cheat Sheet ---------- 
    https://htmlcheatsheet.com/js/*/}

    {/* ---------- Section ---------- 
        P5 serial communication tutorial
        https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/*/}
}


console.log("script.js loaded");

{// ---------- Import Statements ----------
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
}

{// ---------- Variable Declaration ----------
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations
}

// ---------- Define Actions and dependancies ----------
    var activeState;// neutral, playingSound, listeningToSound, creatingScore
    var targetTone;
    var toneIsPlaying = false; 
    var toneDuration = 2000;// 250(25 miliseconds) 2000(2 seconds)
    var startTime;

    var buttonData, currentButtonState, previousButtonState;

    var finalScore;

    var mic;
    var spectrum;
    var fft;
    var osc;

    var maxes = []
    const SENSITIVITY = 50; // How fast the avg moves
    const minimumFrequency = 50; // Hz
    const maximumFrequency = 1000; // Hz
    
    if(window.innerWidth > maximumFrequency - minimumFrequency){
        var rangeScale = (maximumFrequency - minimumFrequency) / 2;
        var largeFontSize = 64;
        var mediumFontSize = 24;
        var smallFontSize = 12;
    } else if(window.innerWidth < maximumFrequency - minimumFrequency){
        // var rangeScale = (maximumFrequency - minimumFrequency) / 4;
        var rangeScale = window.innerWidth * 0.4;
        var largeFontSize = 48;
        var mediumFontSize = 18;
        var smallFontSize = 8;
    }

    function setup() {
        createCanvas(windowWidth, windowHeight);//windowWidth, windowHeight
        frameRate(90); // pixelDensity(1);

        osc = new p5.Oscillator();

        mic = new p5.AudioIn();
        mic.start();
        const smoothing = 0.8; // The p5 default
        const bins = 8192; // Way more than the default, which is 1024
        fft = new p5.FFT(smoothing, bins);
        fft.setInput(mic);
        
        activeState = "neutral";// neutral, playingSound, listeningToSound, creatingScore
    }

{// ---------- Define Main Sequence(s) ----------
    //
}

// ---------- Define Main Loop(s) ----------
    function draw() {
        clear();
        background(200, 200, 255);
        textAlign(CENTER, CENTER); textFont("Playfair Display");
        noStroke();

        micLevel = mic.getLevel();
        fft.analyze();

        previousButtonState = currentButtonState; currentButtonState = buttonData;

        if(activeState == "neutral"){

            strokeWeight(1); stroke(0);
            line((windowWidth / 2) - rangeScale, windowHeight * 0.5, (windowWidth / 2) + rangeScale, windowHeight * 0.5);
            noStroke();

            textSize(largeFontSize); fill(0);
            text("Repeat After Me", windowWidth / 2, windowHeight * 0.2);

            textSize(mediumFontSize); fill(0);
            text("Press mouse or tap screen to play!", windowWidth / 2, windowHeight * 0.8);
            // text("Repeat the tone into your microphone to see how close you can get", windowWidth / 2, windowHeight * 0.85);

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(smallFontSize);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }
            //----------------------------------------------------------------------------

            // if(previousButtonState == 0 && currentButtonState == 1){} else if(previousButtonState == 1 && currentButtonState == 1){} else 
            if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "playingSound";
            }
        } else if(activeState == "playingSound"){
            strokeWeight(1); stroke(0);
            line((windowWidth / 2) - rangeScale, windowHeight * 0.5, (windowWidth / 2) + rangeScale, windowHeight * 0.5);
            noStroke();

            if(!toneIsPlaying){
                targetTone = 125 + Math.floor(Math.random() * (750 - 125) + 1);//random number between first number and number - 1 + random multiplier
                osc.freq(targetTone);
                osc.start(); // osc.stop(toneDuration / 1000); 
                toneIsPlaying = true; 
                startTime = new Date().getTime();// console.log(startTime);
            }
            if(new Date().getTime() > startTime + toneDuration){// console.log(startTime+" : "+new Date().getTime());
                osc.stop();
                toneIsPlaying = false;
                activeState = "listeningToSound";
            }

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(smallFontSize);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }

            drawFrequency(targetTone, "target");
            //----------------------------------------------------------------------------

            textSize(mediumFontSize); fill(0);
            text("Listen carefully!", windowWidth / 2, windowHeight * 0.8)

            // if(previousButtonState == 0 && currentButtonState == 1){} else if(previousButtonState == 1 && currentButtonState == 1){} else if (previousButtonState == 1 && currentButtonState == 0){activeState = "listeningToSound";}

        } else if(activeState == "listeningToSound"){
            strokeWeight(1); stroke(0);
            line((windowWidth / 2) - rangeScale, windowHeight * 0.5, (windowWidth / 2) + rangeScale, windowHeight * 0.5);
            noStroke();

            textSize(mediumFontSize); fill(0);
            text("press and hold your mouse or screen", windowWidth / 2, windowHeight * 0.8);
            text("while repeating the tone into your microphone", windowWidth / 2, windowHeight * 0.825);

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(smallFontSize);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }
            //----------------------------------------------------------------------------

            drawFrequency(targetTone, "target");

            // if(previousButtonState == 0 && currentButtonState == 1){} else 
            if(previousButtonState == 1 && currentButtonState == 1){
                //---------------------------------------------------------------------------
                // Rolling average of the primary frequency. This makes the graph less jumpy.
                if (micLevel > 0.001) {maxes.push(max)}// add primary frequency to list
                if (maxes.length > SENSITIVITY) {maxes.shift()}// remove first item
                const sumOfMaxFrequencies = maxes.reduce((s, m) => s + m.i, 0);
                var rollingAvgFreq = sumOfMaxFrequencies / maxes.length;
                drawFrequency(rollingAvgFreq, "average");
                finalScore = rollingAvgFreq;
                //---------------------------------------------------------------------------
            } else if (previousButtonState == 1 && currentButtonState == 0){
                activeState = "creatingScore";
            }
        } else if(activeState == "creatingScore"){
            strokeWeight(1); stroke(0);
            line((windowWidth / 2) - rangeScale, windowHeight * 0.5, (windowWidth / 2) + rangeScale, windowHeight * 0.5);
            noStroke();

            drawFrequency(finalScore, "average");
            drawFrequency(targetTone, "target");// console.log(Math.abs(finalScore - targetTone));
            
            fill(0); textSize(largeFontSize);
            if(Math.abs(finalScore - targetTone) < 10){// console.log("within 10");
                text("PERFECT!", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 50){// console.log("within 50");
                text("AMAZING!", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 100){// console.log("within 100");
                text("GOOD!", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 200){// console.log("within 200");
                text("OKAY", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 300){// console.log("within 300");
                text("okay...", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 400){// console.log("within 400");
                text("NOT GREAT", windowWidth / 2, windowHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 500){// console.log("within 500");
                if(windowWidth < maximumFrequency - minimumFrequency){
                    text("GET OFF", windowWidth / 2, windowHeight * 0.12);
                    text("THE STAGE!", windowWidth / 2, windowHeight * 0.18);
                } else {
                    text("GET OFF THE STAGE", windowWidth / 2, windowHeight * 0.2);
                }
            } else{// console.log("> 500")
                if(windowWidth < maximumFrequency - minimumFrequency){
                    text("ARE YOU", windowWidth / 2, windowHeight * 0.12);
                    text("EVEN TRYING?", windowWidth / 2, windowHeight * 0.18);
                } else {
                    text("ARE YOU EVEN TRYING?", windowWidth / 2, windowHeight * 0.2);
                }
            }
            textSize(mediumFontSize);
            text("press mouse or tap screen to try again!", windowWidth / 2, windowHeight * 0.8)
            
            // if(previousButtonState == 0 && currentButtonState == 1){} else if(previousButtonState == 1 && currentButtonState == 1){} else 
            if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "neutral";
            }
        }
    }
// ---------- Define Tertiary Processes ----------
    function drawFrequency(frequency, energy){
        let aX = getFrequencyX(frequency);
        let bX = aX;
        let lineHeight;

        if(energy == "target"){
            lineHeight = windowHeight / 4;
            strokeWeight(5); stroke(200, 255, 200);
        } else if(energy == "average"){
            lineHeight = windowHeight / 4;
            strokeWeight(5); stroke(0, 0, 255);
        } else{
            lineHeight = energy / 2;
            strokeWeight(1.5); stroke(0);
        }

        let aY = (windowHeight / 2) - lineHeight;
        let bY = (windowHeight / 2) + lineHeight;

        line(aX, aY, bX, bY);
        noStroke(0); noFill();
    }

    function getFrequencyX(frequency){
        return map(frequency, minimumFrequency, maximumFrequency, (windowWidth / 2) - rangeScale, (windowWidth / 2) + rangeScale);
        //(value, fromLOW, fromHIGH, toLOW, toHIGH, constrain(optional))
    }

    function mousePressed(){
        buttonData = 1;
    }
    function mouseReleased(){
        buttonData = 0;
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
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}