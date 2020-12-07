# 2020-CS492-YooFi
We are team YooFi for the 2020 Fall CS492 Human-AI Interaction@KAIST by prof. Juho Kim
<br>
Authors: YoonHoi Jeon, Sakonporn Noree, Willmer Quinones

---

## Project summary

Our system, YOYO, allows you to do yoga on your own, wherever you want, whenever you want, without having to go to the gym, and without expensive private tutors. All you need is a space for a yoga mat and a device with a camera (cell phone, laptop). Our system, using Deep learning for Computer vision, extracts the skeleton from the instructor and user's postures, compares them and displays them on the screen. In addition, the user can directly adjust the sensitivity of the model, and the system provides feedback to help users make better use of the system.

## Imprementation Notes

- Prototype URL :  [https://yoofi-yoyo.herokuapp.com/](https://yoofi-yoyo.herokuapp.com/)
    - [ ]  You need to **allow to use the CAMERA**
    - [ ]  Since our system is optimized for the web browser environment; NodeJS based Google's Chrome V8 js engine, it is recommended to connect to a **PC, chrome browser**.
- Repository URL : [https://github.com/WRafell/2020-CS492-YooFi.git](https://github.com/WRafell/2020-CS492-YooFi.git)
- Libraries and frameworks
    1. The development of this project was mainly based on *ml5* and *p5js.*
        - **[ml5's poseNet()](https://ml5js.org/reference/api-PoseNet/):** PoseNet is a machine learning model API that allows for Real-time Human Pose Estimation. In can be integrated to our app via JavaScript. For instances:

            ```jsx
            const poseNet = ml5.poseNet(video, modelLoaded);
            ```

        - **[p5.js](https://p5js.org/):** p5.js is a JavaScript library that has a full set of drawing functionality. We use *p5js* to draw the skeleton of the user and the reference's image that PoseNet detect.
    2. Our webpage was built on [PUG](https://pugjs.org/api/getting-started.html), a template engine implemented with JavaScript for Node.js and browsers.
