/* ========================================================  
# CS492 | YooFi Team
## YOYO (You Only Yoga Once)
### URL: https://yoofi-yoyo.herokuapp.com/
### Authors: Yoonhoi Jeon, Sakonporn Noree, Willmer Quinones
### Github: https://github.com/WRafell/2020-CS492-YooFi
=========================================================== */

/* ===== GLOBAL VARIABLES ===== */ 
/*
The ml5's PoseNet returns poses, i.e. points as coordinates (x, y) for each bodypart (e.g. leftHip, rightShoulder),
that the model finds in a given image. We request two poses, one for the reference and one for the user.
-- img_poses: poses found for the reference
-- user_poses: poses found for the user
*/
var img_poses = [];
var user_poses = [];

/*
A skeleton refers to connected bodyparts (points), 
-- ref_information: information of the reference's pose including bodyparts that composed the skeleton,
                    angle and length of each part.
-- user_information: information of the user's pose, similar to the previous one
-- match_parts: the intersection of the ref_information and user_information on bodyparts
-- diff_bodyparts: given an angle deviation, which bodyparts of the user are different from the reference
-- all_instruction: based on the different bodyparts, the instructions for the user to fix her pose
*/
let ref_information = [];
let user_information = [];
let match_parts = [];
let diff_bodyparts = [];
let all_instructions = [];


/*
These are the variables for the timer and clock of the system
*/
let startTime;
let settingTimes = document.getElementById("timesRange").value;
let settingSeconds = document.getElementById("secRange").value;
let times = 0;
let seconds = 0;
let timeCounter = 0;
let secCounter = 0;
let lastSecond = -1;
let startCounting = false;

/*
Fixing the screen size
*/
let screenWidth = 580;
let screenHeight = Math.floor(screenWidth/1.333);

/*
The reference's image location
*/
var img_id = document.getElementById("img_id").value;

//Translating the nomenclature of the bodyparts from ml5's PoseNet to user-friendly names
let bodyparts_dict = {
  "leftHip-leftShoulder": "body",
  "leftElbow-leftShoulder": "left arm",
  "leftElbow-leftWrist": "left forearm",
  "leftHip-leftKnee": "left leg",
  "leftKnee-leftAnkle": "left leg",
  "rightHip-rightShoulder": "body",
  "rightElbow-rightShoulder": "right arm",
  "rightElbow-rightWrist": "right forearm",
  "rightHip-rightKnee": "right leg",
  "rightKnee-rightAnkle": "right leg",
  "leftShoulder-rightShoulder": "body",
  "leftHip-rightHip": "hip",
}

/* ===== UTILITY FUNCTIONS ===== */ 

function get_instruction(u, r, ua, ra, part) {
  /* 
  get_instruction(user_angle_coord, ref_angle_coord, user_angle, ref_angle, bodypart)
  Get instruction based on the angle of the body part for (u)ser and (r)eference
  > Inputs:
    -- u (array): user's pose coordinates
    -- r (array): reference's pose coordinates
    -- ua (float): user bodypart's angle
    -- ra (float): reference bodypart's angle
    -- part (str): bodypart
  > Returns:
    -- instruction (str)
  */

  let action;

  let instruction = "Hint: ";

  let bodypart = bodyparts_dict[part];

  if (bodypart == "body") {
    action = "tilt";
  } else { action = "move"; }

  if (u == r) {
    if (Math.abs(ua) - Math.abs(ra) < 0) {
      instruction += "Try to slightly " + action + " your " + bodypart + " down!\n";
    }
    else {
      instruction += "Try to slightly " + action + " your " + bodypart + " up!\n";
    }
  }

  else if ((u < r) && (u < 3)) {
    instruction += "Try to " + action + " your " + bodypart + " down!\n";
  }

  else if ((u > r) && (u > 2)) {
    instruction += "Try to " + action + " your " + bodypart + " up!\n";
  }

  else if ((u == 1 && r == 2) || (u == 4 && r == 3)) {
    instruction += "Try to " + action + " your " + bodypart + " to the left!\n";
  }
  else {
    instruction += "Try to " + action + " your " + bodypart + " to the right!\n";
  }
  return instruction
}


function angle_length(p1, p2) {
  /*
  Get the angle and length of a given skeleton's part
  > Input:
    -- p1 (dict): coordinates of a bodypart
    -- p2 (dict): coordinates of a bodypart
  > Returns:
    -- [angle, length] (array)
  */
  let x1 = Math.round(p1.x);
  let x2 = Math.round(p2.x);
  let y1 = Math.round(p1.y);
  let y2 = Math.round(p2.y);

  let angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
  let length = Math.hypot(y2 - y1, x2 - x1);

  return [Math.round(angle), Math.round(length)];
}

function get_pose_information(pose, info_array) {
  /*
  Given a pose dictionary, construct an array of each part of the skeleton,
  its angle, length and coordinates
  > Input:
    -- pose (dict): the pose estimation from the ML model
    -- info_array (array): global variable to be filled with the information
  > Returns:
    -- info_array (array)

  */
  info_array = [];
  let skeletons = pose.skeleton;
  for(j=0; j < skeletons.length; j+=1){
    let skeleton = skeletons[j];
    let point1 = skeleton[0].position;
    let point2 = skeleton[1].position;

    let values = angle_length(point1, point2);

    let angle = values[0];
    let length = values[1];

    let coord;
    if (angle >=0) {
      if (angle > 90) { coord = 4 } else { coord = 1 };
    } else {
      if (angle >= -90) { coord = 2 } else { coord = 3 };
    };

    let part1 = skeleton[0].part;
    let part2 = skeleton[1].part;

    let x1 = skeleton[0].position.x;
    let y1 = skeleton[0].position.y;
    let x2 = skeleton[1].position.x;
    let y2 = skeleton[1].position.y;

    let to_add = [part1, part2, x1, y1, x2, y2, angle, length, coord];
    info_array.push(to_add);
  }
  return info_array;
}

function matching(user_tp, ref_tp){
  /*
  Getting the common bodyparts detected for the user and the reference
  > Input:
    -- user_tp(array): user's pose information
    -- ref_tp(array): reference's pose information
  > Returns:
    -- match_parts(array)
  */
  match_parts = [];

  for(j=0; j<user_tp.length; j+=1){
    for(i=0; i<ref_tp.length; i+=1){      

      let up1 = user_tp[j][0]; // user bodypart1
      let up2 = user_tp[j][1]; // user bodypart2
      let ux1 = user_tp[j][2]; // user bodypart1 x coordinate
      let uy1 = user_tp[j][3]; // user bodypart1 y coordinate
      let ux2 = user_tp[j][4]; // user bodypart2 x coordinate
      let uy2 = user_tp[j][5]; // user bodypart2 y coordinate
      let ua = user_tp[j][6]; // user angle
      let ul = user_tp[j][7]; // user length
      let uc = user_tp[j][8]; // user angle coordinate

      let rp1 = ref_tp[i][0]; // ref bodypart1
      let rp2 = ref_tp[i][1]; // ref bodypart2
      let rx1 = ref_tp[i][2]; // ref bodypart1 x coordinate
      let ry1 = ref_tp[i][3]; // ref bodypart1 y coordinate
      let rx2 = ref_tp[i][4]; // ref bodypart2 x coordinate
      let ry2 = ref_tp[i][5]; // ref bodypart2 y coordinate
      let ra = ref_tp[i][6]; // ref angle
      let rl = ref_tp[i][7]; // ref length
      let rc = ref_tp[i][8]; // ref angle coordinate

      if((up1 == rp1 && up2 == rp2) || (up1 == rp2 && up2 == rp1)){
        let to_add = [rp1, rp2, ux1, uy1, ux2, uy2, ua, ul, uc,
                                rx1, ry1, rx2, ry2, ra, rl, rc];
        match_parts.push(to_add);
      }
    }
  }
  return match_parts;
}

function get_diff(p) {
  /*
  Getting different bodyparts coordinates based on a angle deviation
  > Inputs:
    -- p(array): skeletons' information (coordinates and angles)
  > Returns:
    -- [diff_bodyparts, all_instructions] (array)
      -- diff_bodyparts(array): which bodyparts have different angles?
      -- all_instructions(array): instructions on how to fix the pose
  */
  let diff_bodyparts = [];
  let all_instructions = [];
  let angle_deviation = document.getElementById("sensitivityRange").value;

  for(i=0; i<p.length; i+=1){

    let bodypart;
    let instruction;

    let bodypart1 = p[i][0];
    let bodypart2 = p[i][1];

    if(bodypart1.includes('Hip') && bodypart2.includes('Hip')){
      continue;
    }

    let user_x1 = p[i][2];
    let user_y1 = p[i][3];
    let user_x2 = p[i][4];
    let user_y2 = p[i][5];
    let user_angle = p[i][6];
    let user_length = p[i][7];
    let user_angle_coord = p[i][8];

    let ref_x1 = p[i][9];
    let ref_y1 = p[i][10];
    let ref_x2 = p[i][11];
    let ref_y2 = p[i][12];
    let ref_angle = p[i][13];
    let ref_length = p[i][14];
    let ref_angle_coord = p[i][15];

    let diff_angle = Math.max(user_angle, ref_angle) - Math.min(user_angle, ref_angle);
    if(diff_angle > angle_deviation){
      bodypart = bodypart1 + "-" + bodypart2;
      instruction = get_instruction(user_angle_coord, ref_angle_coord, user_angle, ref_angle, bodypart);

      all_instructions.push(instruction);
      diff_bodyparts.push(bodypart);
    }
  }
  return [diff_bodyparts, all_instructions];  
}

function resetVariables() {
  /*
  Reset global variables
  */
  user_information = [];
  match_parts = [];
  diff_bodyparts = [];
  all_instructions = [];
  document.body.style.backgroundColor = "black";
}

function stopWatch(){
  /*
  Start global clock
  */
  let now = new Date().getTime();
  let timeDiff = now - startTime;
  return Math.floor((timeDiff) / 1000);
}

function settingsChanged() {
  /*
  (bool) Check if the user has changed the setting (on the setting HTML page)
  */
  let times = document.getElementById("timesRange").value;
  let seconds = document.getElementById("secRange").value;
  let sensitivity = document.getElementById("sensitivityRange").value;

  if ((times === settingTimes) || (seconds === settingTimes)) {
    settingTimes = times;
    settingSeconds = seconds;
    return false;
  }
  return true;
}

function resetCounters() {
  /*
  Reset global counters
  */
  timeCounter = 0;
  secCounter = 0;
  lastSecond = 0;
  resetVariables();
  document.getElementById('timer').innerHTML = 'Hold the pose to start...';
}


/* ===== MAIN P5js VIEWS ===== */ 

// Reference's view
var imgSide = function( sketch ) {

  // Image Variables
  var moon, moonCopy, img, imageRatio;
  var imageWidth, imageHeight, resizedWidth, resizedHeight, ratioWidth, ratioHeight;
  var img_path;

  let img_posenet;

  function imageReady() {
    const options = {
      minConfidence: 0.1,
      inputResolution: {screenWidth, screenHeight},
    };

    img_posenet = ml5.poseNet(modelReady, options);

    img_posenet.on("pose", function(results) {
      img_poses = results;
    });
  }


  function modelReady() {
    sketch.select('#hint').html("Model loaded. Loading skeleton...");

    img_posenet.singlePose(img);
  }

  sketch.setup = function() {
    sketch.createCanvas(screenWidth, screenHeight).parent("reference");
    img = sketch.createImg(img_id, imageReady);
    img_show = sketch.createImg(img_id);
    img.size(screenWidth, screenHeight);
    img.hide();
    img_show.hide();
  }

  sketch.draw = function() {
    sketch.strokeWeight(10);
    sketch.stroke(255, 0, 0);
    if(img_poses.length > 0){ 
        sketch.background(0);        
        sketch.translate(screenWidth,0);
        sketch.scale(-1.0,1.0);   
        sketch.image(img_show,0,0, screenWidth, screenHeight);
        sketch.drawRefKeyPoints(img_poses);
        sketch.drawRefSkeleton(img_poses);
    }
  }

  sketch.drawRefKeyPoints = function() {
    ratioHeight = 1;
    ratioWidth = 1;
    for(let i = 0; i < img_poses.length; i+=1){
      const pose = img_poses[i].pose;
      for(let j=0; j < pose.keypoints.length; j+=1){
        const keypoint = pose.keypoints[j];

        if(keypoint.score > 0.2){
          sketch.fill(255);
          sketch.noStroke();
          sketch.ellipse(sketch.round(keypoint.position.x*ratioWidth), 
                         sketch.round(keypoint.position.y*ratioHeight), 5, 5);
          sketch.fill(0);
          sketch.noStroke();
          sketch.ellipse(keypoint.position.x*ratioWidth, 
                         keypoint.position.y*ratioHeight, 2, 2);
        }
      }
    }
  }

  sketch.drawRefSkeleton = function() {
    ratioHeight = 1;
    ratioWidth = 1;
    for( i=0; i < img_poses.length; i+=1){
      const skeleton = img_poses[i].skeleton;
      for( j=0; j<skeleton.length; j+=1){
        const partA = skeleton[j][0]
        const partB = skeleton[j][1]
        const partAB = partA.part + "-" + partB.part;
        const partBA = partB.part + "-" + partA.part;

        if (diff_bodyparts.includes(partAB) || diff_bodyparts.includes(partBA)){
          sketch.stroke(255, 0, 0);
        }
        else {
          sketch.stroke(0, 255, 0);
        }
        sketch.strokeWeight(7);
        sketch.line(partA.position.x*ratioWidth, partA.position.y*ratioHeight, partB.position.x*ratioWidth, partB.position.y*ratioHeight)
      }
    }
  } 
};

// User's view
var vidSide = function( sketch ) {

    let video;
    let video_poseNet;

    sketch.setup = function() {
      startTime = new Date().getTime();
      sketch.createCanvas(screenWidth, screenHeight).parent("webcam");
      video = sketch.createCapture(sketch.VIDEO);
      video.size(screenWidth, screenHeight);

      // Create a new video_poseNet method with a single detection
      video_poseNet = ml5.poseNet(video, 'single', modelReady);
      video_poseNet.on("pose", function(results) {

        seconds = stopWatch();
        if (seconds != lastSecond){
          if (settingsChanged()) {
            secCounter = 0;
            timeCounter = 0;
          }
          lastSecond = seconds;

          user_poses = results;
          ref_information = get_pose_information(img_poses[0], ref_information);

          if (user_poses[0].skeleton.length > 0){
            user_information = get_pose_information(user_poses[0], user_information);
            if (user_information.length <= 6) {
              resetVariables();
              secCounter = 0;
              sketch.select("#hint").html("I cannot see you properly &#128064; \
                ~ Could you place yourself in the screen?");
            } else {

              match_parts = matching(user_information, ref_information);
              diff_values = get_diff(match_parts);
              diff_bodyparts = diff_values[0];
              all_instructions = diff_values[1];

              if (all_instructions.length > 0) {
                document.body.style.backgroundColor = "red";
                sketch.select("#hint").html(all_instructions[0]);  
              } else {
                document.body.style.backgroundColor = "green";
                sketch.select("#hint").html("Very well done!   &#128079; &#129321;"); 
                startCounting = true;
              }

              if (startCounting == true) {                

                if (timeCounter == settingTimes) {
                  timeCounter = 0;
                  secCounter = 0;
                } else if (secCounter == settingSeconds) {
                  timeCounter += 1;
                  secCounter = 0;
                } else {
                  secCounter += 1;
                }

                sketch.select("#timer").html('Times: ' + timeCounter + '. Seconds: ' + secCounter);
              }              
            }
          } else {
            resetVariables();
            secCounter = 0;
            sketch.select("#hint").html("No one there... &#128549;");
          }
        }          

      });
      // Hide the video element, and just show the canvas
      video.hide();
    }

    function modelReady() {
      sketch.select("#hint").html("Model Loaded. Loading skeleton...");
    }

    sketch.draw = function() {
      sketch.translate(screenWidth,0);
      sketch.scale(-1.0,1.0);   
      sketch.image(video, 0, 0, screenWidth, screenHeight);

      // We can call both functions to draw all keypoints and the skeletons
      sketch.drawKeypoints();
      sketch.drawSkeleton();
    }

    // A function to draw ellipses over the detected keypoints
    sketch.drawKeypoints = function() {
      // Loop through all the user_poses detected
      for (let i = 0; i < user_poses.length; i += 1) {
        // For each pose detected, loop through all the keypoints
        const pose = user_poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j += 1) {
          // A keypoint is an object describing a body part (like rightArm or leftShoulder)
          const keypoint = pose.keypoints[j];
          // Only draw an ellipse is the pose probability is bigger than 0.2
          if (keypoint.score > 0.2) {
            sketch.fill(255);
            sketch.noStroke();
            sketch.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            sketch.fill(0);
            sketch.noStroke();
            sketch.ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
          }
        }
      }
    }

    // A function to draw the skeletons
    sketch.drawSkeleton = function() {
      if (user_poses.length > 0){
        // Loop through all the skeletons detected
        const user_pose = user_poses[0];
        const confidence = user_pose.pose.score;
        console.log(confidence);
        const skeleton = user_pose.skeleton;
        if (confidence > 0.4){
          // For every skeleton, loop through all body connections
          for (let j = 0; j < skeleton.length; j += 1) {
            const partA = skeleton[j][0];
            const partB = skeleton[j][1];
            const partAB = partA.part + "-" + partB.part;
            const partBA = partB.part + "-" + partA.part;
            if (diff_bodyparts.includes(partAB) || diff_bodyparts.includes(partBA)){
              sketch.stroke(255, 0, 0);
            }
            else {
              sketch.stroke(0, 255, 0);
            }
            sketch.strokeWeight(15);
            sketch.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
          }
        }   
      }
    } 
}

// Starting reference's pose
new p5(imgSide);

// Starting user's pose
new p5(vidSide);