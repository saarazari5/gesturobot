<p align="center">
  <img src="https://img.icons8.com/?size=512&id=55494&format=png" width="20%" alt="GESTUROBOT-logo">
</p>
<p align="center">
    <h1 align="center">GESTUROBOT</h1>
</p>
<p align="center">
    <em><code>❯ REPLACE-ME</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/saarazari5/gesturobot?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/saarazari5/gesturobot?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/saarazari5/gesturobot?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/saarazari5/gesturobot?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
		<em>Built with the tools and technologies:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?style=flat&logo=styled-components&logoColor=white" alt="styledcomponents">
	<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>

<br>

#####  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
    - [ Prerequisites](#-prerequisites)
    - [ Installation](#-installation)
    - [ Usage](#-usage)
    - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

GESTUROBOT is an innovative application designed to facilitate the understanding and manipulation of robotic gestures through an intuitive user interface. This project aims to bridge the gap between human interactions and robotic movements, allowing users to create, manage, and visualize gestures seamlessly. Whether you are a researcher, developer, or enthusiast, GESTUROBOT provides the tools to explore the exciting intersection of technology and human expression.

---

##  Features

Gesture Creation and Management: Easily create and manage custom gestures using a user-friendly interface. Users can define specific movements and save them for future use.

Emotion Recognition: Integrate emotion recognition capabilities to enhance robotic interactions, allowing the robot to respond appropriately based on user emotions.

Experiment Tracking: Track and analyze gesture performance in various experiments, facilitating research and development in robotic behavior.

Video Demonstrations: View and analyze gesture movements through video demonstrations to gain insights into robotic interactions.

Language Support: Multilingual support ensures that users from different backgrounds can easily navigate and utilize the application.

Extensive Documentation: Comprehensive documentation to guide users through setup, features, and best practices for using GESTUROBOT.

Community Contributions: Engage with a vibrant community for feedback, suggestions, and collaborative improvements to the project.

---

##  Repository Structure

```sh
└── gesturobot/
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── add.png
    │   ├── background1.avif
    │   ├── default.png
    │   ├── example1.mp4
    │   ├── example2.mp4
    │   ├── favicon.ico
    │   ├── gif1.gif
    │   ├── home.png
    │   ├── index.html
    │   ├── logo.webp
    │   ├── logo1.png
    │   ├── logo2.png
    │   ├── logo3.png
    │   ├── logout.png
    │   ├── manifest.json
    │   ├── movements
    │   │   ├── 1.mp4
    │   │   ├── 10.mp4
    │   │   ├── 11.mp4
    │   │   ├── 12.mp4
    │   │   ├── 13.mp4
    │   │   ├── 14.mp4
    │   │   ├── 15.mp4
    │   │   ├── 16.mp4
    │   │   ├── 17.mp4
    │   │   ├── 18.mp4
    │   │   ├── 2.mp4
    │   │   ├── 3.mp4
    │   │   ├── 4.mp4
    │   │   ├── 5.mp4
    │   │   ├── 6.mp4
    │   │   ├── 7.mp4
    │   │   ├── 8.mp4
    │   │   ├── 9.mp4
    │   │   └── robot2
    │   └── robots.txt
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── components
        │   ├── FilterMenu.js
        │   ├── PrivateRoute
        │   ├── gestureLable
        │   ├── gesturesection
        │   ├── loopOfMovements
        │   ├── movment
        │   └── videoWindow
        ├── config
        │   └── config.json
        ├── databases
        │   ├── data.json
        │   ├── emotions.js
        │   ├── gesturesAPI.js
        │   ├── movementsAPI.js
        │   ├── newExperimentAPI.js
        │   ├── taggersAPI.js
        │   ├── tazNameTypeAPI.js
        │   └── usersAPI.js
        ├── index.css
        ├── index.js
        ├── language-management
        │   ├── LanguageContext.js
        │   ├── LanguageSwicher.css
        │   ├── LanguageSwicher.js
        │   ├── Translations.js
        │   ├── en.json
        │   └── he.json
        ├── logo.svg
        ├── pages
        │   ├── createNewExperiment
        │   ├── createNewGesture
        │   ├── demographicForm
        │   ├── gesturedisplay
        │   ├── gesturemanagement
        │   ├── gesturetag
        │   ├── labelfeedback
        │   ├── mainpage
        │   ├── movementslib
        │   ├── tagInstructions
        │   └── userLogin
        ├── params.js
        ├── python
        │   └── movements.py
        ├── reportWebVitals.js
        └── setupTests.js
```

---

##  Modules

<details closed><summary>.</summary>

| File | Summary |
| --- | --- |
| [package.json](https://github.com/saarazari5/gesturobot/blob/main/package.json) | <code>❯ REPLACE-ME</code> |
| [package-lock.json](https://github.com/saarazari5/gesturobot/blob/main/package-lock.json) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>public</summary>

| File | Summary |
| --- | --- |
| [background1.avif](https://github.com/saarazari5/gesturobot/blob/main/public/background1.avif) | <code>❯ REPLACE-ME</code> |
| [index.html](https://github.com/saarazari5/gesturobot/blob/main/public/index.html) | <code>❯ REPLACE-ME</code> |
| [manifest.json](https://github.com/saarazari5/gesturobot/blob/main/public/manifest.json) | <code>❯ REPLACE-ME</code> |
| [robots.txt](https://github.com/saarazari5/gesturobot/blob/main/public/robots.txt) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src</summary>

| File | Summary |
| --- | --- |
| [reportWebVitals.js](https://github.com/saarazari5/gesturobot/blob/main/src/reportWebVitals.js) | <code>❯ REPLACE-ME</code> |
| [App.test.js](https://github.com/saarazari5/gesturobot/blob/main/src/App.test.js) | <code>❯ REPLACE-ME</code> |
| [setupTests.js](https://github.com/saarazari5/gesturobot/blob/main/src/setupTests.js) | <code>❯ REPLACE-ME</code> |
| [params.js](https://github.com/saarazari5/gesturobot/blob/main/src/params.js) | <code>❯ REPLACE-ME</code> |
| [App.js](https://github.com/saarazari5/gesturobot/blob/main/src/App.js) | <code>❯ REPLACE-ME</code> |
| [App.css](https://github.com/saarazari5/gesturobot/blob/main/src/App.css) | <code>❯ REPLACE-ME</code> |
| [index.js](https://github.com/saarazari5/gesturobot/blob/main/src/index.js) | <code>❯ REPLACE-ME</code> |
| [index.css](https://github.com/saarazari5/gesturobot/blob/main/src/index.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.language-management</summary>

| File | Summary |
| --- | --- |
| [LanguageSwicher.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageSwicher.js) | <code>❯ REPLACE-ME</code> |
| [LanguageSwicher.css](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageSwicher.css) | <code>❯ REPLACE-ME</code> |
| [en.json](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/en.json) | <code>❯ REPLACE-ME</code> |
| [LanguageContext.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageContext.js) | <code>❯ REPLACE-ME</code> |
| [Translations.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/Translations.js) | <code>❯ REPLACE-ME</code> |
| [he.json](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/he.json) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin</summary>

| File | Summary |
| --- | --- |
| [Login.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Login.js) | <code>❯ REPLACE-ME</code> |
| [userLogin.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/userLogin.css) | <code>❯ REPLACE-ME</code> |
| [Login.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Login.css) | <code>❯ REPLACE-ME</code> |
| [userLogin.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/userLogin.js) | <code>❯ REPLACE-ME</code> |
| [AuthContext.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/AuthContext.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin.LoginForm</summary>

| File | Summary |
| --- | --- |
| [LoginForm.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/LoginForm/LoginForm.js) | <code>❯ REPLACE-ME</code> |
| [LoginForm.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/LoginForm/LoginForm.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin.Bubble</summary>

| File | Summary |
| --- | --- |
| [Bubble.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Bubble/Bubble.css) | <code>❯ REPLACE-ME</code> |
| [Bubble.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Bubble/Bubble.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin.InputBar</summary>

| File | Summary |
| --- | --- |
| [InputBar.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/InputBar/InputBar.js) | <code>❯ REPLACE-ME</code> |
| [InputBarPopOver.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/InputBar/InputBarPopOver.css) | <code>❯ REPLACE-ME</code> |
| [ShakingField.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/InputBar/ShakingField.js) | <code>❯ REPLACE-ME</code> |
| [InputBar.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/InputBar/InputBar.css) | <code>❯ REPLACE-ME</code> |
| [InputBarPopOver.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/InputBar/InputBarPopOver.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin.Logo</summary>

| File | Summary |
| --- | --- |
| [Logo.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Logo/Logo.css) | <code>❯ REPLACE-ME</code> |
| [Logo.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/Logo/Logo.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.userLogin.LoginMessage</summary>

| File | Summary |
| --- | --- |
| [LoginMessage.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/LoginMessage/LoginMessage.js) | <code>❯ REPLACE-ME</code> |
| [LoginMessage.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/LoginMessage/LoginMessage.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.labelfeedback</summary>

| File | Summary |
| --- | --- |
| [labelfeedback.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/labelfeedback/labelfeedback.css) | <code>❯ REPLACE-ME</code> |
| [labelfeedback.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/labelfeedback/labelfeedback.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.createNewGesture</summary>

| File | Summary |
| --- | --- |
| [createNewGesture.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/createNewGesture/createNewGesture.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.gesturedisplay</summary>

| File | Summary |
| --- | --- |
| [ErrorModal.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/ErrorModal.css) | <code>❯ REPLACE-ME</code> |
| [GestureDisplay.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/GestureDisplay.js) | <code>❯ REPLACE-ME</code> |
| [EmotionGroupForm.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/EmotionGroupForm.js) | <code>❯ REPLACE-ME</code> |
| [GestureDisplay.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/GestureDisplay.css) | <code>❯ REPLACE-ME</code> |
| [ErrorModal.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/ErrorModal.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.mainpage</summary>

| File | Summary |
| --- | --- |
| [MainPage.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/mainpage/MainPage.js) | <code>❯ REPLACE-ME</code> |
| [mainpage.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/mainpage/mainpage.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.createNewExperiment</summary>

| File | Summary |
| --- | --- |
| [createNewExperiment.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/createNewExperiment/createNewExperiment.css) | <code>❯ REPLACE-ME</code> |
| [createNewExperiment.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/createNewExperiment/createNewExperiment.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.gesturetag</summary>

| File | Summary |
| --- | --- |
| [gesturetag.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturetag/gesturetag.js) | <code>❯ REPLACE-ME</code> |
| [gesturetag.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturetag/gesturetag.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.demographicForm</summary>

| File | Summary |
| --- | --- |
| [demographicForm.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/demographicForm/demographicForm.js) | <code>❯ REPLACE-ME</code> |
| [demographicForm.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/demographicForm/demographicForm.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.gesturemanagement</summary>

| File | Summary |
| --- | --- |
| [gestureManagement.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturemanagement/gestureManagement.css) | <code>❯ REPLACE-ME</code> |
| [gesturemanagement.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturemanagement/gesturemanagement.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.movementslib</summary>

| File | Summary |
| --- | --- |
| [movementslib.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/movementslib/movementslib.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.pages.tagInstructions</summary>

| File | Summary |
| --- | --- |
| [tagInstructions.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/tagInstructions/tagInstructions.js) | <code>❯ REPLACE-ME</code> |
| [tagInstructions.css](https://github.com/saarazari5/gesturobot/blob/main/src/pages/tagInstructions/tagInstructions.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components</summary>

| File | Summary |
| --- | --- |
| [FilterMenu.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/FilterMenu.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.videoWindow</summary>

| File | Summary |
| --- | --- |
| [VideoContainer.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/VideoContainer.js) | <code>❯ REPLACE-ME</code> |
| [SidePanel.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/SidePanel.css) | <code>❯ REPLACE-ME</code> |
| [SidePanel.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/SidePanel.js) | <code>❯ REPLACE-ME</code> |
| [ConfirmationModal.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/ConfirmationModal.js) | <code>❯ REPLACE-ME</code> |
| [ConfirmationModal.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/ConfirmationModal.css) | <code>❯ REPLACE-ME</code> |
| [VideoWindow.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/VideoWindow.js) | <code>❯ REPLACE-ME</code> |
| [UnifiedModal.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/UnifiedModal.js) | <code>❯ REPLACE-ME</code> |
| [index.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/index.js) | <code>❯ REPLACE-ME</code> |
| [index.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/index.css) | <code>❯ REPLACE-ME</code> |
| [VideoContainer.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/VideoContainer.css) | <code>❯ REPLACE-ME</code> |
| [VideoWindow.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/VideoWindow.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.movment</summary>

| File | Summary |
| --- | --- |
| [movment.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/movment/movment.css) | <code>❯ REPLACE-ME</code> |
| [movment.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/movment/movment.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.gestureLable</summary>

| File | Summary |
| --- | --- |
| [gestureLable.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/gestureLable/gestureLable.js) | <code>❯ REPLACE-ME</code> |
| [gestureLable.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/gestureLable/gestureLable.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.loopOfMovements</summary>

| File | Summary |
| --- | --- |
| [loopOfMovements.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/loopOfMovements/loopOfMovements.css) | <code>❯ REPLACE-ME</code> |
| [loopOfMovements.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/loopOfMovements/loopOfMovements.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.gesturesection</summary>

| File | Summary |
| --- | --- |
| [gesturesection.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/gesturesection/gesturesection.css) | <code>❯ REPLACE-ME</code> |
| [ConfirmationModal.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/gesturesection/ConfirmationModal.js) | <code>❯ REPLACE-ME</code> |
| [gesturesection.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/gesturesection/gesturesection.js) | <code>❯ REPLACE-ME</code> |
| [ConfirmationModal.css](https://github.com/saarazari5/gesturobot/blob/main/src/components/gesturesection/ConfirmationModal.css) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.components.PrivateRoute</summary>

| File | Summary |
| --- | --- |
| [PrivateRoute.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/PrivateRoute/PrivateRoute.js) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.config</summary>

| File | Summary |
| --- | --- |
| [config.json](https://github.com/saarazari5/gesturobot/blob/main/src/config/config.json) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.python</summary>

| File | Summary |
| --- | --- |
| [movements.py](https://github.com/saarazari5/gesturobot/blob/main/src/python/movements.py) | <code>❯ REPLACE-ME</code> |

</details>

<details closed><summary>src.databases</summary>

| File | Summary |
| --- | --- |
| [newExperimentAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/newExperimentAPI.js) | <code>❯ REPLACE-ME</code> |
| [movementsAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/movementsAPI.js) | <code>❯ REPLACE-ME</code> |
| [usersAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/usersAPI.js) | <code>❯ REPLACE-ME</code> |
| [emotions.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/emotions.js) | <code>❯ REPLACE-ME</code> |
| [data.json](https://github.com/saarazari5/gesturobot/blob/main/src/databases/data.json) | <code>❯ REPLACE-ME</code> |
| [gesturesAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/gesturesAPI.js) | <code>❯ REPLACE-ME</code> |
| [tazNameTypeAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/tazNameTypeAPI.js) | <code>❯ REPLACE-ME</code> |
| [taggersAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/taggersAPI.js) | <code>❯ REPLACE-ME</code> |

</details>

---

##  Getting Started

###  Prerequisites

**JavaScript**: `version x.y.z`

###  Installation

Build the project from source:

1. Clone the gesturobot repository:
```sh
❯ git clone https://github.com/saarazari5/gesturobot
```

2. Navigate to the project directory:
```sh
❯ cd gesturobot
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command:

```sh
❯ node app.js
```

###  Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/saarazari5/gesturobot/issues)**: Submit bugs found or log feature requests for the `gesturobot` project.
- **[Submit Pull Requests](https://github.com/saarazari5/gesturobot/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/saarazari5/gesturobot/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/saarazari5/gesturobot
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/saarazari5/gesturobot/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=saarazari5/gesturobot">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
