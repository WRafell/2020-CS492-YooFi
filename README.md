# 2020-CS492-YooFi
We are team YooFi for the 2020 Fall CS492 Human-AI Interaction@KAIST by prof. Juho Kim
### Background & Problem

**Background**

- COVID19 로 인해 집에서 보내는 시간이 많아짐,  GYM 이 문을 닫음,
- 사람과 대면을 하지않고 혼자 집에서 할 수 있는 home training 에 대한 관심 증가.
- 그 중 요가는 특별한 기구가 없어도 매트 한장의 공간만있으면 누구나 할 수 있기 때문에 홈트레이닝 운동으로 사랑받는다. .

**Previous Works** 

- phisical&psychological well-being 는 사람의 삶에 있어서 원래 중요했기 때문에 HCI 필드에서 이미 Health care, excercise, 에 관련 연구가 많이 진행되었다.
- 기존연구들은 Deep learning 기술을 이용하여 센서 데이터나 computer vision 기술을 기반으로 모델의 estimation accuracy 를 높이는 데에 초점을 맞추어 왔다.
- 높은 정확도를 위해 sophisticated model이나 특수한 장치 (sensors, kinethic- depth camera)들은 큰 컴퓨팅 자원가 특수한 디바이스를 자원으로 필요로 하기 때문에 실생활에서는 적용하기 힘들다.

**Problem** 

- However, 실제 사용자들은 사용할 수 있는 비용이 한정되어 있다.  한정된 장비와  완벽하지 않은 정확도를 가지고 충분한 만족도를 주기 위해서는 Human AI interaction에 대한 고려가 반드시 필요한데, 이에 대한 연구는 적게 이루어져 왔다 .

### Aim & method

- An aim of our system, which we used pose estimation API based on Computer Vision, is to engage the satisfaction of the user by  focusing on the human-AI interaction that allows the users to experience the bi-directional interaction rather than one-directional lecture from the system.
- 기존 one-directional interaction에서 벗어나서 bi-directional interaction을 가능하게 하는 것.

    Ultimately, it breaks awy from the existing one-directional interaction and enabels bi-directional interaction. 

- Futhermore, 이를 통해 오프라인에서 실제 instructor에게 수업을 받는 것에 가까워진 쌍방향 수업을 혼자, 원하는 공간에서 가능하게 한다.

    Through this advanced form of interaction, futheromre, it is possible for the users to take interactive lessons closer to taking lessons from an actual instructor offline in the space they want by themselves.

### Methodologies

- We designed a system which serve 3 main functions

    (1) Visual feedback using skeleton from pose estimation

    (2) Model usage feedback

    In real world, user sometimes did not know what and how to feed the model for an input so we give adequate guidelines when they made unadequate input that the user can chagne their usage pattern.

    (3) Parameter Modification

    The users are be served the setting functions, including times and secs for the training, that help the users can modify the model fit to their circumstances. 
    Even if the accuarcay is low, the user can feel comfortable by changing the setting of sensitivity to flexible. 

- Results and Implecation
- Discussion and Conclusions
