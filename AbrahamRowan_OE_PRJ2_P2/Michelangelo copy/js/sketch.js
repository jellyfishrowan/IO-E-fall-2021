{/* ---------- Details ----------
    Title: Interactive Media Project 3
    Purpose: Interactive (P5) Digital Display
    Code Version: 1
    Availability: IXD firebird server
    Creator: Abraham R., Nouri A.*/}

{// ---------- Learning Resources ----------

    {/* ---------- JS Reference ----------
    https://p5js.org/reference/*/}

    {/* ---------- Section ----------
        Text
        Link*/}
    }
    console.log("change line 96 to calibrate with different cameras");

    {// ---------- Import Statements ----------
        //
    }

    {// ---------- Variable Declaration ----------
        var cam;
        var poseNet;
        var nose;

        var displayObject;
        var displayObjectTexture;

        var totalWidth, totalHeight;
        var halfWidth, halfHeight;
        var largestPossibleValue;

        const materialModes = ["vapor", "marble"];
        var activeMaterialMode = materialModes[0];

        const modelModes = ["david", "modelTwo", "modelThree"]
        var activeModelMode = modelModes[0];

        var largestVal = 0;

    }

    // ---------- Define Actions and dependancies ----------
        preload = () => {
            displayObject = loadModel('assets/david.obj');
            //texture = loadImage();
            //displayObjectTexture = loadImage('img/asset4.png');
        }

        setup = () => {
            totalWidth = windowWidth; totalHeight = windowHeight;
            halfWidth = totalWidth / 2; halfHeight = totalHeight / 2;
            createCanvas(totalWidth, totalHeight, WEBGL);
            frameRate(60); pixelDensity(2);
            cam = createCapture(VIDEO);
            cam.hide();
            //cam.size();
            poseNet = ml5.poseNet(cam, {flipHorizontal: true});
            poseNet.on('pose', gotPoses);
            nose = createVector(0 - halfWidth, 0 - halfHeight);
        }

        let gotPoses = (poses) => {
            if(poses.length > 0){
                nose.x = lerp(poses[0].pose.keypoints[0].position.x, nose.x, 0.8);
                nose.y = lerp(poses[0].pose.keypoints[0].position.y, nose.y, 0.8);
            }
        }

    {// ---------- Define Main Sequence(s) ----------
        //
    }

    {// ---------- Define Main Loop(s) ----------
        draw = () => {
            clear();
            background(255, 255, 255);
            //image(cam, 0- halfWidth, 0 - halfHeight, totalWidth, totalHeight);
            noStroke(); strokeWeight(2); fill(255, 0, 0, 0);

            if (activeMaterialMode === "vapor"){
                background(178, 223, 219);
                normalMaterial();
                document.getElementById("title").style.color = "#ff0073";
                document.getElementById("details").style.color = "#00b368";
            } else if(activeMaterialMode === "marble"){
                directionalLight(255, 255, 255, 10, 20, -50);
                ambientLight(50);
                ambientMaterial(255, 255, 255);
                document.getElementById("title").style.color = "#000000";
                document.getElementById("details").style.color = "#000000";
            }

            largestPossibleValue = 690; //Use this section to find the largest possible value of webcam input, replace largestPossibleValue
            rotateY( 0 - (( (2 * PI) / largestPossibleValue) * nose.x));
            if(nose.x > largestVal){largestVal = nose.x;}
            console.log("Largest("+largestVal+"), curr("+(int(100 * (nose.x/largestVal)))+"), "+nose.x);

            if(activeModelMode === "david"){
                document.getElementById("title").innerHTML = "David of Michelangelo";
                document.getElementById("details").innerHTML = "Michelangelo, Marble Statue, 1501-1504";
                rotateX(PI);//model is upside down, this is to flip it to correct orientation
                translate(0, 0 - (windowHeight * 0.325),0);
                scale(windowHeight * 0.00175);
                model(displayObject);
            }
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
            totalWidth = windowWidth; totalHeight = windowHeight;
            halfWidth = totalWidth / 2; halfHeight = totalHeight / 2;
            resizeCanvas(totalWidth, totalHeight);
        }

        function keyPressed(){
            //console.log(event);
            if(key == "m"){
                if(activeMaterialMode == "vapor"){
                    activeMaterialMode = "marble";
                } else if(activeMaterialMode == "marble"){
                    activeMaterialMode = "vapor";
                }
            }
        }
    }

    {// ---------- Upon Exiting Page ----------
        //https://www.w3schools.com/jsref/event_onunload.asp
    }


// { // ---------- Variable Declaration ----------
//   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations
//   let displayObject;
//   var horizontalRotation = 0;
//   var verticalRotation = 0;
//   // Variables for PoseNet
//   let cam;
//   let poseNet;
//   let hand;
// }
// { // ---------- Define Main Sequence(s) ----------
//   function preload() {
//     displayObject = loadModel('assets/model.obj');
//     texture = loadImage();
//   }
//   function setup() {
//     let foregroundCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
//     let foregroundParent = document.getElementById("foreGround");
//     foregroundCanvas.parent(foregroundParent);
//     originX = 0 - windowWidth / 2;
//     originY = 0 - windowHeight / 2;
//     objectTexture = loadImage('img/asset4.png');
//     // Beginning of PoseNet code
//     cam = createCapture(VIDEO);
//     cam.hide();
//     cam.size(windowWidth, windowHeight);
//     poseNet = ml5.poseNet(cam, {
//       flipHorizontal: false //flips interaction
//     }, modelReady);
//     poseNet.on('pose', gotPoses);
//     hand = createVector(width / 2, height / 2);
//     // End of PoseNet code
//   }
// }
// // Grabs keypoints for poses
// let gotPoses = (poses) => {
//   //console.log(poses);
//   //only detect if there is a person
//   if (poses.length > 0) {
//     hand.x = lerp(poses[0].pose.keypoints[10].position.x, hand.x, 0.7);
//     hand.y = lerp(poses[0].pose.keypoints[10].position.y, hand.y, 0.7);
//     //console.log("hand.x("+hand.x+"), hand.y("+hand.y+")");
//   }
// }
// // No idea what this is (maybe the user's body?)
// let modelReady = () => {
//     console.log('model ready');
// }
// { // ---------- Define Main Loop(s) ----------
//   function draw() {
//     clear();
//     background(100, 100, 100, 1);
//     scale(300);
//     // horizontalRotation = windowWidth / 360;
//     // verticalRotation = windowHeight / 360;
//     //rotateX((hand.y - (windowHeight / 2)) * 0.005);
//     rotateY(hand.x * 0.005);
//     texture(objectTexture);
//     model(displayObject);
//     fill(255,0,0);
//     //ellipse(hand.x, hand.y, 500);
//     //stroke(255,0,0);
//     //line(originX, originY, hand.x - (windowWidth / 2), hand.y - (windowHeight / 2));
//     ellipse(hand.x + originX, hand.y + originY, 1)
//     console.log("hand.x("+hand.x+"), hand.y("+hand.y+")");
//   }
// }
//
