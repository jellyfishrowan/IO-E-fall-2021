{/* ---------- Details ---------- 
    Template Creator: Rowan Abraham
    Title: <Program title>
    Purpose: <Description>
    Code Version: <Versions>
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

    // var startTime;
    // function draw(){
    //     startTime = clock.getTime();

    //     for(let i = 0; i < displayWidth * 1000; i++){
    //         line(0, displayHeight / 2, displayWidth, displayHeight / 2);
    //     }
    // }

    

    let serial;
    var latestData = "waiting for data";

    var potentiometerData = [];
    var soundData = [];
    var lightData = [];

    var temperatureData = [];
    var humidityData = [];
    var buttonData;

    var pressureData = [];
    var accelerationDataX = [];
    var accelerationDataY = [];
    var accelerationDataZ = [];



    // var mic;
    // var fft;
    var osc;

    // var pitchGrouping = []; var sumTone; var averageMicTone;
    var activeState;// neutral, playingSound, listeningToSound, creatingScore
    var targetTone;
    var toneIsPlaying = false; 
    var toneDuration = 2000;// 250(25 miliseconds) 2000(2 seconds)
    // var clock = new Date(); 
    var startTime;

    var currentButtonState, previousButtonState;
    var finalScore;

    var mic;
    var spectrum;
    var fft;
    var maxes = []
    const SENSITIVITY = 50; // How fast the avg moves
    const minimumFrequency = 50; // Hz
    const maximumFrequency = 1000; // Hz
    const rangeScale = (maximumFrequency - minimumFrequency) / 2;
    // var gap = 1; // Granularity - gap between frequencies that are tested. NEED TO MODIFY BEFORE THIS CAN BE REMOVED
    

    function setup() {
        createCanvas(displayWidth, displayHeight);//displayWidth, displayHeight
        frameRate(90); pixelDensity(1);

        osc = new p5.Oscillator();

        mic = new p5.AudioIn();
        mic.start();
        const smoothing = 0.8; // The p5 default
        const bins = 8192; // Way more than the default, which is 1024
        fft = new p5.FFT(smoothing, bins);
        fft.setInput(mic);
        


        activeState = "neutral";// neutral, playingSound, listeningToSound, creatingScore

    
        serial = new p5.SerialPort();
        serial.list(); serial.open('COM3');
        serial.on('connected', serverConnected);
        serial.on('list', gotList);
        serial.on('data', gotData);
        serial.on('error', gotError);
        serial.on('open', gotOpen);
        serial.on('close', gotClose);
    }
    
    function serverConnected() {
        print("Connected to Server");
    }
    
    function gotList(thelist) {
        print("List of Serial Ports:");

        for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
        }
    }
    
    function gotOpen() {
        print("Serial Port is Open");
    }
    
    function gotClose(){
        print("Serial Port is Closed");
        latestData = "Serial Port is Closed";
    }
    
    function gotError(theerror) {
        print(theerror);
    }
    
    function gotData() {
        let currentString = serial.readLine();
        trim(currentString);
        if (!currentString) return;
        // console.log(currentString);
        latestData = currentString.split(/,/);

        potentiometerData[potentiometerData.length] = currentString.split(/,/)[0];
        soundData[soundData.length] = currentString.split(/,/)[1];
        lightData[lightData.length] = currentString.split(/,/)[2];

        temperatureData[temperatureData.length] = currentString.split(/,/)[3];
        humidityData[humidityData.length] = currentString.split(/,/)[4];
        buttonData = currentString.split(/,/)[5];

        pressureData[pressureData.length] = currentString.split(/,/)[6];
        accelerationDataX[accelerationDataX.length] = currentString.split(/,/)[7];
        accelerationDataY[accelerationDataY.length] = currentString.split(/,/)[8];
        accelerationDataZ[accelerationDataZ.length] = currentString.split(/,/)[9];
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
            line((displayWidth / 2) - rangeScale, displayHeight * 0.5, (displayWidth / 2) + rangeScale, displayHeight * 0.5);
            noStroke();

            textSize(64); fill(0);
            text("Repeat After Me", displayWidth / 2, displayHeight * 0.2);

            textSize(24); fill(0);
            text("Press button to play!", displayWidth / 2, displayHeight * 0.8);
            text("Repeat the tone into your microphone to see how close you can get", displayWidth / 2, displayHeight * 0.85);

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(12);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }
            //----------------------------------------------------------------------------




            
            // noStroke(); textSize(64); fill(255);
            // text("Press button to begin", displayWidth / 2, displayHeight / 2);
            // textSize(12);

            // activeTone = 0;

            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "playingSound";
            }
        } else if(activeState == "playingSound"){
            // background(100, 200, 100)

            strokeWeight(1); stroke(0);
            line((displayWidth / 2) - rangeScale, displayHeight * 0.5, (displayWidth / 2) + rangeScale, displayHeight * 0.5);
            noStroke();

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(12);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }
            //----------------------------------------------------------------------------

            textSize(24); fill(0);
            text("Listen carefully!", displayWidth / 2, displayHeight * 0.8)

            drawFrequency(targetTone, "target");

            if(!toneIsPlaying){
                targetTone = 125 + Math.floor(Math.random() * (750 - 125) + 1);//random number between first number and number - 1 + random multiplier
                osc.freq(targetTone);
                // drawFrequency(targetTone, "target");

                osc.start(); osc.stop(toneDuration / 1000); 
                toneIsPlaying = true;
                startTime = new Date().getTime();
                // console.log(startTime);
            }
            console.log(startTime+" : "+new Date().getTime());
            if(new Date().getTime() > startTime + toneDuration){
                toneIsPlaying = false;
                activeState = "listeningToSound";
            }


            // setTimeout(function(){
                // osc.stop();
                // toneIsPlaying = false;
                // activeState = "listeningToSound";
                
            // }, toneDuration);

            

            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
            } else if (previousButtonState == 1 && currentButtonState == 0){
                // activeState = "listeningToSound";
            }

        } else if(activeState == "listeningToSound"){
            // background(100, 100, 255);

            strokeWeight(1); stroke(0);
            line((displayWidth / 2) - rangeScale, displayHeight * 0.5, (displayWidth / 2) + rangeScale, displayHeight * 0.5);
            noStroke();

            textSize(24); fill(0);
            text("Hold the button and repeat the tone!", displayWidth / 2, displayHeight * 0.8)

            //----------------------------------------------------------------------------
            var max = {freq: 0, energy: 0};
            for (let i = minimumFrequency; i < maximumFrequency; i++) {
                if(i % 50 === 0){
                    fill(0); textSize(12);
                    text(i, getFrequencyX(i), 15);
                    noFill();
                }
                const energy = fft.getEnergy(i);// Get energy of this freq, and draw it
                drawFrequency(i, energy);
                max = (energy > max.energy) ? {i, energy} : max;// Find primary frequency
            }
            //----------------------------------------------------------------------------

            drawFrequency(targetTone, "target");
    
            



            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
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
            // background(255, 50, 255);

            strokeWeight(1); stroke(0);
            line((displayWidth / 2) - rangeScale, displayHeight * 0.5, (displayWidth / 2) + rangeScale, displayHeight * 0.5);
            noStroke();

            drawFrequency(finalScore, "average");
            drawFrequency(targetTone, "target");
            // console.log(Math.abs(finalScore - targetTone));
            fill(0); textSize(64);
            if(Math.abs(finalScore - targetTone) < 10){
                console.log("within 10");
                text("PERFECT!", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 50){
                console.log("within 50");
                text("AMAZING!", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 100){
                console.log("within 100");
                text("GOOD!", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 200){
                console.log("within 200");
                text("OKAY", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 300){
                console.log("within 300");
                text("okay...", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 400){
                console.log("within 400");
                text("NOT GREAT", displayWidth / 2, displayHeight * 0.2);
            } else if(Math.abs(finalScore - targetTone) < 500){
                console.log("within 500");
                text("BOO! GET OFF THE STAGE!", displayWidth / 2, displayHeight * 0.2);
            } else{
                console.log("> 500")
                text("ARE YOU EVEN TRYING?", displayWidth / 2, displayHeight * 0.2);
            }
            textSize(24);
            text("Press button to try again!", displayWidth / 2, displayHeight * 0.8)
            
            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "neutral";
            }
        }
    }





    // function drawFreqLine(frequency, thickness = 10, energy = 255){
    //     const line = {
    //         x: 0,
    //         y: getY(frequency),
    //         w: width * energy/255,
    //         h: thickness
    //     };
    //     fill(0, 50, 250);
    //     rect(line.x, line.y, line.w, line.h);
    // }

    function drawFrequency(frequency, energy){

        let aX = getFrequencyX(frequency);
        let bX = aX;
        let lineHeight;

        if(energy == "target"){
            lineHeight = displayHeight / 4;
            strokeWeight(5); stroke(200, 255, 200);
        } else if(energy == "average"){
            lineHeight = displayHeight / 4;
            // noStroke(); fill(255, 0, 0);
            // text(frequency, aX, displayHeight * 0.8);
            strokeWeight(5); stroke(0, 0, 255);
        } else{
            lineHeight = energy;
            strokeWeight(1.5); stroke(0);
        }

        let aY = (displayHeight / 2) - lineHeight;
        let bY = (displayHeight / 2) + lineHeight;

        line(aX, aY, bX, bY);
        noStroke(0); noFill();
    }




    
    function getY(value){
        return map(value, minimumFrequency, maximumFrequency, 0, displayHeight);
    }

    function getFrequencyX(frequency){
        return map(frequency, minimumFrequency, maximumFrequency, (displayWidth / 2) - rangeScale, (displayWidth / 2) + rangeScale);//(value, fromLOW, fromHIGH, toLOW, toHIGH, constrain(optional))
    }

    // function getPosition(i){
    //     //
    // }


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
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}