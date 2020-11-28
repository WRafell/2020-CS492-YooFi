# Report

We are team **YooFi** for the 2020 Fall CS492 Human-AI Interaction@KAIST by prof. Juho Kim

---

## 1. Project summary

Our system, YOYO, allows you to do yoga on your own, wherever you want, whenever you want, without having to go to the gym, and without expensive private tutors. All you need is a space for a yoga mat and a device with a camera (cell phone, laptop). Our system, using Deep learning for Computer vision, extracts the skeleton from the instructor and user's postures, compares them and displays them on the screen. In addition, the user can directly adjust the sensitivity of the model, and the system provides feedback to help users make better use of the system.

## 2. Instruction

YOYO, You Only Yoga Once, is a home training website for yoga beginners who want to practice their poses at home.

The system contains three main functions: 

- Matching the user's pose with the reference image
- Giving the hints to the user to correct the pose
- Modifying the level of difficulty of the matching algorithm.

We will explain each function during the prototype tour.

![Report%20f85d29f043404535a1743e00eb29aa78/Untitled.png](Report%20f85d29f043404535a1743e00eb29aa78/Untitled.png)

Figure 1: YOYO's home page.

*In Figure 1:*

- After entering the website ([https://yoofi-yoyo.herokuapp.com/](https://yoofi-yoyo.herokuapp.com/)), the user will see the gallery of basic yoga poses.

The user can select the pose they want to practice. Then, it will bring the user to the main page in Figure 2.

![Report%20f85d29f043404535a1743e00eb29aa78/main_page.png](Report%20f85d29f043404535a1743e00eb29aa78/main_page.png)

Figure 2: YOYO's main page: (a) matching skeleton window, (b) hint window, (c) setting button.

*In Figure 2:*

- Window (a) shows the result from our matching skeleton algorithm. The wrong skeletons are in red; otherwise green. This is our first main feature: **matching the skeleton between the user and the reference image.**
- Window (b) shows our second feature: **giving the hints.** If the pose is not correct, the system will continue offering the guideline to the user.
- Window (c) is the 'show setting' button where the user can **modify the sensitivity of the model**, which is our last main function. Also, the timer can be set here (more detail in Figure 3).

![Report%20f85d29f043404535a1743e00eb29aa78/Untitled%201.png](Report%20f85d29f043404535a1743e00eb29aa78/Untitled%201.png)

Figure 3: Setting section.

*In Figure 3:*

- It presents the setting section where the user can modify the sensitivity of the model to control the difficulty of the matching skeleton algorithm.

Because, in the real world, users sometimes did not know what and how to feed the model for input so we give adequate guidelines when they made inadequate input that the user can change their usage pattern. Even if the accuracy is low, the user can feel comfortable by changing the setting of sensitivity to be flexible. Also, the timer to hold the pose can be set in this setting section.

After setting the model sensitivity and timer, the user can try matching their pose with the reference's image. 

![Report%20f85d29f043404535a1743e00eb29aa78/4a.png](Report%20f85d29f043404535a1743e00eb29aa78/4a.png)

Figure 4a: The screen when the pose is not correct yet. The yellow box shows hint and instruction.

![Report%20f85d29f043404535a1743e00eb29aa78/4b.png](Report%20f85d29f043404535a1743e00eb29aa78/4b.png)

Figure 4b: The screen when the pose is correct. The timer will start counting (yellow block).

*In Figure 4:*

- Figure 4a: If the skeletons are not matched, not only the skeleton but also the background color are red.
- Figure 4b: Once the user corrects the pose, the background will be green, and the timer starts counting.

Our system will end when the user must hold the pose until time's up.

## 3. Imprementation Notes

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
