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

{// ---------- Define Actions and dependancies ----------
    let serial;
    var latestData = "waiting for data";

    {//declaration of arrays, REQUIRED FOR visualization ,REQUIRES ARRAY INPUT IN getData()
        // var potentiometerData = [];
        // var soundData = [];
        // var lightData = [];

        // var temperatureData = [];
        // var humidityData = [];
        // var buttonData = [];

        // var pressureData = [];
        // var accelerationDataX = [];
        // var accelerationDataY = [];
        // var accelerationDataZ = [];
    }
    {//declaration of single variables
        var potentiometerData = 0;
        var soundData = 0;
        var lightData = 0;

        var temperatureData = 0;
        var humidityData = 0;
        var buttonData = 0;

        var pressureData = 0;
        var accelerationDataX = 0;
        var accelerationDataY = 0;
        var accelerationDataZ = 0;
    }



    var divisionH;

    var currentButtonState = 0;//start with button unpressed, required in first loop
    var previousButtonState;

    var toneClockStarted = false, startingTime, currentTime, toneIsPlaying = false;

    var toneFrequency, toneAmplitude, toneWaveType = 'sine', toneDuration, toneDelay, toneSmoothing, tonePan;

    var minimumFrequency = 75;
    var maximumFrequency = 2000;

    var osc;

    function setup() {
        createCanvas(windowWidth, windowHeight);
        frameRate(60); pixelDensity(1);
        background(0);

        divisionH = windowHeight/10;

        osc = new p5.Oscillator();
        // osc.start();
    
        serial = new p5.SerialPort();
        serial.list();
        serial.open("COM3");//-------------------------------------------------------------- CHANGE
        serial.on('connected', serverConnected);
        serial.on('list', gotList);
        serial.on('data', gotData);
        serial.on('error', gotError);
        serial.on('open', gotOpen);
        serial.on('close', gotClose);
    }
    
    function serverConnected() {print("Connected to Server");}
    function gotList(thelist) {print("List of Serial Ports:");
        for (let i = 0; i < thelist.length; i++) {print(i + " " + thelist[i]);}
    }
    function gotOpen() {print("Serial Port is Open");}
    function gotClose(){latestData = "Serial Port is Closed"; print(latestData);}
    function gotError(theerror) {print(theerror);}
    function gotData() {
        let currentString = serial.readLine();
        trim(currentString);
        if (!currentString) return;
        
        latestData = currentString;
        currentString = latestData.split(/,/);

        {//input into array variable, REQUIRES ARRAY DECLARATION, REQUIRED FOR visualization
            // potentiometerData[potentiometerData.length] = currentString[0];
            // soundData[soundData.length] = currentString[1];
            // lightData[lightData.length] = currentString[2];

            // temperatureData[temperatureData.length] = currentString[3];
            // humidityData[humidityData.length] = currentString[4];
            // buttonData[buttonData.length] = currentString[5];

            // pressureData[pressureData.length] = currentString[6];
            // accelerationDataX[accelerationDataX.length] = currentString[7];
            // accelerationDataY[accelerationDataY.length] = currentString[8];
            // accelerationDataZ[accelerationDataZ.length] = currentString[9];
        }
        {//input into single variable
            potentiometerData = currentString[0];
            soundData = currentString[1];
            lightData = currentString[2];

            temperatureData = currentString[3];
            humidityData = currentString[4];
            buttonData = currentString[5];

            pressureData = currentString[6];
            accelerationDataX = currentString[7];
            accelerationDataY = currentString[8];
            accelerationDataZ = currentString[9];
        }
    }
}



{// ---------- Define Main Sequence(s) ----------
    //
}

{// ---------- Define Main Loop(s) ----------
    function draw() {
        // clear();
        // background(255);

        // sometimes the program runs halfway through a serial input, so establish all values if not available
        if(!potentiometerData || !soundData || !lightData || !temperatureData || !humidityData || !buttonData || !pressureData || !accelerationDataX || !accelerationDataY || !accelerationDataZ){
            potentiometerData=soundData=lightData=temperatureData=humidityData=buttonData=pressureData=accelerationDataX=accelerationDataY=accelerationDataZ = 0;
        }

        previousButtonState = currentButtonState; currentButtonState = buttonData;

            // temperatureData
        toneSmoothing = round(temperatureData, 2);
            // potentiometerData
        toneFrequency = map(potentiometerData, 0, 1, minimumFrequency, maximumFrequency, true);
        osc.freq(toneFrequency, toneSmoothing);
            // soundData
        //
            // lightData
        toneAmplitude = round(lightData, 2);
        osc.amp(toneAmplitude, toneSmoothing);
        // osc.amp(0);
            // pressureData
        //
            // humidityData
        //
            // buttonData
        if(previousButtonState == 1 && currentButtonState == 0){
            if(toneWaveType == 'sine'){toneWaveType = 'triangle';
            } else if(toneWaveType == 'triangle'){toneWaveType = 'sawtooth';
            } else if(toneWaveType == 'sawtooth'){toneWaveType = 'square';
            } else if(toneWaveType == 'square'){toneWaveType = 'sine'}

            osc.setType(toneWaveType);
        }
            // accelerationDataX
        toneDuration = map(accelerationDataX, -1, 1, 0, 1000, true);
            // accelerationDataY
        // toneDelay = accelerationDataY * 1000;
        toneDelay = map(accelerationDataY, -1, 1, 0, 1000, true);
            // accelerationDataZ
            tonePan = map(accelerationDataZ, -1, 1, -1, 1, true);
        osc.pan(tonePan, 0);

        // osc.start(toneDelay);
        // osc.stop(toneDuration);

        currentTime = new Date().getTime();
        // console.log(toneClockStarted);
        if(toneClockStarted == false){
            startingTime = new Date().getTime();
            toneClockStarted = true;
        } else if(currentTime > startingTime + toneDelay && currentTime < startingTime + toneDelay + toneDuration && !toneIsPlaying){
            osc.start();
            toneIsPlaying = true;

            generateObject(toneWaveType, toneAmplitude, toneFrequency);
            
        } else if(currentTime > startingTime + toneDelay + toneDuration){
            osc.stop();
            toneClockStarted = false;
            toneIsPlaying = false;
        }
        // else if(new Date().getTime() > startingTime + toneDuration && new Date().getTime() < toneClockStarted + toneDuration + toneDelay){
        //     osc.stop();
        // } else if(new Date().getTime() > startingTime + toneDuration + toneDelay){
        //     toneClockStarted = false;
        // }






        
        

        {//buttonstates
            // if(previousButtonState == 0 && currentButtonState == 0){//button is unpressed
            //     //
            // } else if(previousButtonState == 0 && currentButtonState == 1){//button has been pressed, instantialize
            //     //
            // } else if(previousButtonState == 1 && currentButtonState == 1){//button is pressed or held, continue
            //     //
            // } else if(previousButtonState == 1 && currentButtonState == 0){//button has been released
            //     //
            // }
        }

        // noStroke(); // remove stroke from text
        // fill(0, 0, 0); // text fill rgb value
        // text(latestData, 10, 10); // arduino data

        {// visualization, REQUIRES INPUT INTO ARRAY IN DECLARATION & gotData()
            // for(let i = 1; i <= 9; i++){
            //     fill(255,255,255); noStroke();
            //     rect(0, divisionH * i, windowWidth);
            //     // stroke(0, 0, 0);
            //     // line(0, divisionH * i, windowWidth, divisionH * i);
            // }

            // for(let i = 0; i < potentiometerData.length-1; i++){//get length of all arrays (which are equal, so I only need one)
            //     while(potentiometerData.length-1 > windowWidth){//if array length is greater than pixel value of screen, reduce array length
            //         potentiometerData.shift();
            //         soundData.shift();
            //         lightData.shift();

            //         temperatureData.shift();
            //         humidityData.shift();
            //         buttonData.shift();

            //         pressureData.shift();
            //         accelerationDataX.shift();
            //         accelerationDataY.shift();
            //         accelerationDataZ.shift();
            //     }

            //     stroke(200, 200, 200); 

            //     line(i, divisionH, i, divisionH - potentiometerData[i] * divisionH);
            //     line(i, divisionH * 2, i, divisionH * 2 - soundData[i] * divisionH);
            //     line(i, divisionH * 3, i, divisionH * 3 - lightData[i] * divisionH);

            //     line(i, divisionH * 4, i, divisionH * 4 - temperatureData[i] * divisionH);
            //     line(i, divisionH * 5, i, divisionH * 5 - humidityData[i] * divisionH);
            //     line(i, divisionH * 6, i, divisionH * 6 - buttonData[i] * divisionH);

            //     line(i, divisionH * 7, i, divisionH * 7 + pressureData[i] * divisionH);
            //     line(i, divisionH * 7.5, i, divisionH * 7.5 - accelerationDataX[i] * divisionH / 2);
            //     line(i, divisionH * 8.5, i, divisionH * 8.5 - accelerationDataY[i] * divisionH / 2);
            //     line(i, divisionH * 9.5, i, divisionH * 9.5 - accelerationDataZ[i] * divisionH / 2);
            // }

            // for(let i = 1; i <= 9; i++){
            //     stroke(0, 0, 0);
            //     line(0, divisionH * i, windowWidth, divisionH * i);
            // }

            // fill(0); stroke(255);
            // text("Potentiometer", 20, divisionH - 10);
            // text("Sound Level", 20, divisionH * 2 - 10);
            // text("Light Level", 20, divisionH * 3 - 10);
            // text("Temperature (0-50 Celsius)", 20, divisionH * 4 - 10);
            // text("Humidity %", 20, divisionH * 5 - 10);
            // text("Button", 20, divisionH * 6 - 10);
            // text("Air Pressure", 20, divisionH * 7 - 10);
            // text("X Acceleration", 20, divisionH * 8 - 10);
            // text("Y Acceleration", 20, divisionH * 9 - 10);
            // text("Z Acceleration", 20, divisionH * 10 - 10);
        }



        // osc = new p5.Oscillator('wave type');
        //base class of noise and pulse

        // osc.freq(frequency, smoothing in seconds);
        // osc.amp(amplitude, smoothing in seconds);

        // osc.start(delay in seconds);
        // osc.stop(delay in seconds);

        //filter
        //reverb
        //envelope
        //

        //duration
        //loop or alternation between 
    }
}

{// ---------- Define Tertiary Processes ----------
    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        divisionH = windowHeight/10;
    }
            //size = amplitude
        //strokeweight = 
        //strokeR = 
        //strokeG = 
        //strokeB = 
        //fillR = 
        //fillG = 
        //fillB = 
        //x = 
        //y = 
        //tone frequency for color
        //random X, Y

        //toneWaveType, toneAmplitude, toneFrequency

    function generateObject(type, size, weight){

        size = map(size, 0, 1, 0, 1000);
        weight = map(weight, minimumFrequency, maximumFrequency, 0, 10);

        xPosition = Math.floor(Math.random() * windowWidth + 1);
        yPosition = Math.floor(Math.random() * windowHeight + 1);

        strokeR = Math.floor(Math.random() * 256);
        strokeG = Math.floor(Math.random() * 256);
        strokeB = Math.floor(Math.random() * 256);
        stroke(strokeR, strokeG, strokeB);
        // stroke(0);
        fillR = Math.floor(Math.random() * 256);
        fillG = Math.floor(Math.random() * 256);
        fillB = Math.floor(Math.random() * 256);
        fill(fillR, fillG, fillB);

        strokeWeight(weight);
        
        switch (type){
            case 'sine':
                circle(xPosition, yPosition, size / 2);
                break;
            case 'triangle':
                triangle(xPosition, yPosition - size / 2, xPosition - size / 3, yPosition, xPosition + size / 3, yPosition);
                break;
            case 'sawtooth':
                translate(xPosition, yPosition);// translate the 0, 0; coordinates so that the roation doesn't mess up the whole canvas, then rotate back?
                rotate(PI / 4);
                rect(0 - (size / 4), 0 - (size / 4), size / 2, size / 2);
                break;
            case 'square':
                rect(xPosition - (size / 4), yPosition - (size / 4), size / 2, size / 2);
                break;
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
}

{// ---------- While Running Page ----------
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}