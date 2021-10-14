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



    var mic;
    var spectrum;
    var fft;
    var osc;


    var maxes = [];
    const SENSITIVITY = 50;
    const LOWER_BOUND = 150;
    const UPPER_BOUND = 300;
    var gap = 2;


    var pitchGrouping = []; var sumTone; var averageMicTone;
    var activeState;// neutral, playingSound, listeningToSound, creatingScore
    var activeTone; var toneIsPlaying = false; var toneDuration = 100;// 250(25 miliseconds) 2000(2 seconds)
    var clock = new Date();

    var currentButtonState, previousButtonState;
    var minimumTone = 300; // men(100-120) children(300~?)
    var maximumTone = 2000;// A few sites have differing information. one says 5, other says 8
    

    function setup() {
        createCanvas(displayWidth, displayHeight);//windowWidth, windowHeight
        frameRate(90); pixelDensity(1);

        mic = new p5.AudioIn();
        fft = new p5.FFT();
        mic.start(); fft.setInput(mic);


        osc = new p5.Oscillator();


        activeState = "neutral";// neutral, playingSound, listeningToSound, creatingScore

    
        serial = new p5.SerialPort();

        serial.list();
        serial.open('COM3');

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
    

}



{// ---------- Define Main Sequence(s) ----------
    //
}

{// ---------- Define Main Loop(s) ----------
    function draw() {
        clear();
        background(0);
        textAlign(CENTER, CENTER);
        strokeWeight(5); strokeCap(round); stroke(255, 255, 255);

        micLevel = mic.getLevel();
        fft.analyze();
        let freq = int(fft.getCentroid());

        previousButtonState = currentButtonState; currentButtonState = buttonData;

        if(activeState == "neutral"){
            background(255, 100, 100);
            strokeWeight(0); textSize(64); text("Press button to begin", displayWidth / 2, displayHeight / 2);
            activeTone = 0;
            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "playingSound";
            }

        } else if(activeState == "playingSound"){
            background(100, 255, 100)
            if(!toneIsPlaying){
                activeTone = minimumTone + Math.floor(Math.random() * (maximumTone - minimumTone) + 1);//random number between first number and number - 1 + random multiplier
                osc.freq(activeTone);

                osc.start(); toneIsPlaying = true;
                setTimeout(function(){
                    osc.stop();
                    toneIsPlaying = false;
                    activeState = "listeningToSound";
                }, toneDuration);
            }


        } else if(activeState == "listeningToSound"){
            background(100, 100, 255);
            line( displayWidth * 0.1, displayHeight / 2, displayWidth * 0.9, displayHeight / 2);
            strokeWeight(0); textSize(64);
            text("hold button and repeat tone", displayWidth / 2, displayHeight / 2);
            if(previousButtonState == 0 && currentButtonState == 1){
                pitchGrouping = [];
                sumTone = 0;
                averageMicTone = "";
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
                if(freq > minimumTone && freq < maximumTone){
                    pitchGrouping[pitchGrouping.length] = freq;
                    pitchGrouping.sort((a, b) => a - b);
                    strokeWeight(1); stroke(0, 0, 255);
                    while(pitchGrouping.length > 50){
                        if(Math.abs(pitchGrouping[0] - activeTone) < Math.abs(pitchGrouping[pitchGrouping.length - 1] - activeTone)){ //if array item 1 is closer to current tone than last array item
                            pitchGrouping.pop();//remove last item
                        } else {
                            pitchGrouping.shift();//remove first item
                        }
                    }
                    sumTone = 0;
                    for(let i = 0; i < pitchGrouping.length; i++){
                        sumTone += pitchGrouping[i];
                    }
                    averageMicTone = sumTone / pitchGrouping.length;
                    line(averageMicTone / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.25, averageMicTone / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.75);
                    line(freq / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.25, freq / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.75);
                    text(averageMicTone, averageMicTone / maximumTone * displayWidth * 0.8 + 0.1, displayHeight / 2);

                    sumTone = 0;
                    for(let i = 0; i < pitchGrouping.length; i++){
                        sumTone += pitchGrouping[i];
                    }
                    averageMicTone = int(sumTone / pitchGrouping.length);
                }
            } else if (previousButtonState == 1 && currentButtonState == 0){
                console.log(averageMicTone);
                activeState = "creatingScore"
            }
        } else if(activeState == "creatingScore"){
            background(255, 50, 255);
            line( displayWidth * 0.1, displayHeight / 2, displayWidth * 0.9, displayHeight / 2);
            stroke(255, 0, 0);
            strokeWeight(1);
            line(averageMicTone / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.25, averageMicTone / maximumTone * displayWidth * 0.8 + 0.1, displayHeight * 0.75);
            if(previousButtonState == 0 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 1){
                //
            } else if(previousButtonState == 1 && currentButtonState == 0){
                activeState = "neutral"
            }
        }

        // stroke(0, 255, 0);
        // strokeWeight(5);
        // line((activeTone / maximumTone) * (displayWidth * 0.8 + 0.1), displayHeight * 0.25, (activeTone / maximumTone) * (displayWidth * 0.8 + 0.1), displayHeight * 0.75);
        // stroke(0);
        // fill(255);
        // strokeWeight(0); textSize(12);
        // text(freq, 50, 10);
        // text(activeTone, 100, 10);
        // text(averageMicTone, 150, 10);
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
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}