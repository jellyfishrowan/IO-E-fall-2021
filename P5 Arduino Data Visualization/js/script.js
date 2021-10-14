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

    var potentiometerData = [];
    var soundData = [];
    var lightData = [];

    var temperatureData = [];
    var humidityData = [];
    var buttonData = [];

    var pressureData = [];
    var accelerationDataX = [];
    var accelerationDataY = [];
    var accelerationDataZ = [];

    var divisionH;

    function setup() {
        createCanvas(displayWidth, displayHeight);//windowWidth, windowHeight
        divisionH = displayHeight/10;
        frameRate(60); pixelDensity(1);
    
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
        buttonData[buttonData.length] = currentString.split(/,/)[5];

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
        background(255);
        fill(255,255,255);
        rect(0, divisionH * 1, displayWidth, divisionH * 1);
        rect(0, divisionH * 2, displayWidth, divisionH * 2);
        rect(0, divisionH * 3, displayWidth, divisionH * 3);
        rect(0, divisionH * 4, displayWidth, divisionH * 4);
        rect(0, divisionH * 5, displayWidth, divisionH * 5);
        rect(0, divisionH * 6, displayWidth, divisionH * 6);
        rect(0, divisionH * 7, displayWidth, divisionH * 7);
        rect(0, divisionH * 8, displayWidth, divisionH * 8);
        rect(0, divisionH * 9, displayWidth, divisionH * 9);
        stroke(0);
        line(0, divisionH * 1, displayWidth, divisionH * 1);
        line(0, divisionH * 2, displayWidth, divisionH * 2);
        line(0, divisionH * 3, displayWidth, divisionH * 3);
        line(0, divisionH * 4, displayWidth, divisionH * 4);
        line(0, divisionH * 5, displayWidth, divisionH * 5);
        line(0, divisionH * 6, displayWidth, divisionH * 6);
        line(0, divisionH * 7, displayWidth, divisionH * 7);
        line(0, divisionH * 8, displayWidth, divisionH * 8);
        line(0, divisionH * 9, displayWidth, divisionH * 9);

        // text(latestData, 10, 10);

        // rect(0, 0, potentiometerData, divisionH);
        // rect(0, divisionH, soundData, divisionH);
        // rect(0, divisionH*2, lightData, divisionH);

        // rect(0, divisionH*3, temperatureData, divisionH);
        // rect(0, divisionH*4, humidityData, divisionH);
        // rect(0, divisionH*5, buttonData, divisionH);

        // rect(0, divisionH*6, pressureData, divisionH);
        // rect(0, divisionH*7, accelerationDataX, divisionH);
        // rect(0, divisionH*8, accelerationDataY, divisionH);
        // rect(0, divisionH*9, accelerationDataZ, divisionH);







        // rect(0, 0,             displayWidth, potentiometerData[potentiometerData.length-1] * divisionH);
        // rect(0, divisionH,     displayWidth, soundData[soundData.length-1] * divisionH);
        // rect(0, divisionH * 2, displayWidth, lightData[lightData.length-1] * divisionH);

        // rect(0, divisionH * 3, displayWidth, temperatureData[temperatureData.length-1] * divisionH);//0-50 degrees celsius from component (DHT11)
        // rect(0, divisionH * 4, displayWidth, humidityData[humidityData.length-1] * divisionH);//20-80 percent from component (DHT11)
        // rect(0, divisionH * 5, displayWidth, buttonData[buttonData.length-1] * divisionH);

        // rect(0, divisionH * 6, displayWidth, pressureData[pressureData.length-1] * divisionH);
        // rect(0, divisionH * 7, displayWidth, accelerationDataX[accelerationDataX.length-1] * divisionH);
        // rect(0, divisionH * 8, displayWidth, accelerationDataY[accelerationDataY.length-1] * divisionH);
        // rect(0, divisionH * 9, displayWidth, accelerationDataZ[accelerationDataZ.length-1] * divisionH);










        stroke(200, 200, 200); 
        for(i = 0; i < potentiometerData.length-1; i++){
            // console.log(i);
            while(potentiometerData.length-1 > displayWidth){
                potentiometerData.shift();
                soundData.shift();
                lightData.shift();

                temperatureData.shift();
                humidityData.shift();
                buttonData.shift();

                pressureData.shift();
                accelerationDataX.shift();
                accelerationDataY.shift();
                accelerationDataZ.shift();
            }

            line(i, divisionH, i, divisionH - potentiometerData[i] * divisionH);
            line(i, divisionH * 2, i, divisionH * 2 - soundData[i] * divisionH);
            line(i, divisionH * 3, i, divisionH * 3 - lightData[i] * divisionH);

            line(i, divisionH * 4, i, divisionH * 4 - temperatureData[i] * divisionH);
            line(i, divisionH * 5, i, divisionH * 5 - humidityData[i] * divisionH);
            line(i, divisionH * 6, i, divisionH * 6 - buttonData[i] * divisionH);

            line(i, divisionH * 7, i, divisionH * 7 + pressureData[i] * divisionH);
            line(i, divisionH * 7.5, i, divisionH * 7.5 - accelerationDataX[i] * divisionH / 2);
            line(i, divisionH * 8.5, i, divisionH * 8.5 - accelerationDataY[i] * divisionH / 2);
            line(i, divisionH * 9.5, i, divisionH * 9.5 - accelerationDataZ[i] * divisionH / 2);

        }

        fill(0); 
        text("Potentiometer", 20, divisionH - 10);
        text("Sound Level", 20, divisionH * 2 - 10);
        text("Light Level", 20, divisionH * 3 - 10);
        text("Temperature (0-50 Celsius)", 20, divisionH * 4 - 10);
        text("Humidity %", 20, divisionH * 5 - 10);
        text("Button", 20, divisionH * 6 - 10);
        text("Air Pressure", 20, divisionH * 7 - 10);
        text("X Acceleration", 20, divisionH * 8 - 10);
        text("Y Acceleration", 20, divisionH * 9 - 10);
        text("Z Acceleration", 20, divisionH * 10 - 10);

        
        // text(displayWidth, 10, 10);
        // text(displayHeight, 10, 10);
        // potentiometerData, soundData, lightData, buttonData
        
        // Polling method
       //  if (serial.available() > 0) {
       //   let data = serial.read();
       //   ellipse(50,50,data,data);
       //  }
        
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