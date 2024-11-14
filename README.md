<p align="center">
  <img src="https://www.roscomponents.com/1794-thickbox_default/go2-quadruped-robot-.jpg" width="20%" alt="GESTUROBOT-logo">
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

## Modules

<details closed><summary>Public</summary>

| File | Summary |
| --- | --- |
| [background1.avif](https://github.com/saarazari5/gesturobot/blob/main/public/background1.avif) | Background image used in the application. |
| [index.html](https://github.com/saarazari5/gesturobot/blob/main/public/index.html) | Main HTML file for the application. |
| [manifest.json](https://github.com/saarazari5/gesturobot/blob/main/public/manifest.json) | Web app manifest for progressive web application settings. |
| [robots.txt](https://github.com/saarazari5/gesturobot/blob/main/public/robots.txt) | Instructions for web crawlers on how to index the site. |

</details>

<details closed><summary>Src</summary>

| File | Summary |
| --- | --- |
| [reportWebVitals.js](https://github.com/saarazari5/gesturobot/blob/main/src/reportWebVitals.js) | Utility for measuring performance metrics in the application. |
| [App.test.js](https://github.com/saarazari5/gesturobot/blob/main/src/App.test.js) | Test suite for the main application component. |
| [setupTests.js](https://github.com/saarazari5/gesturobot/blob/main/src/setupTests.js) | Configuration file for setting up tests. |
| [params.js](https://github.com/saarazari5/gesturobot/blob/main/src/params.js) | Configuration parameters for the application. |
| [App.js](https://github.com/saarazari5/gesturobot/blob/main/src/App.js) | Main application component. |
| [App.css](https://github.com/saarazari5/gesturobot/blob/main/src/App.css) | Styles for the main application component. |
| [index.js](https://github.com/saarazari5/gesturobot/blob/main/src/index.js) | Entry point for the React application. |
| [index.css](https://github.com/saarazari5/gesturobot/blob/main/src/index.css) | Global styles for the application. |

</details>

<details closed><summary>Language Management</summary>

| File | Summary |
| --- | --- |
| [LanguageSwicher.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageSwicher.js) | Component for switching between languages. |
| [LanguageSwicher.css](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageSwicher.css) | Styles for the language switcher component. |
| [en.json](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/en.json) | English translations for the application. |
| [LanguageContext.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/LanguageContext.js) | Context provider for language management. |
| [Translations.js](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/Translations.js) | Component handling the translation logic. |
| [he.json](https://github.com/saarazari5/gesturobot/blob/main/src/language-management/he.json) | Hebrew translations for the application. |

</details>

<details closed><summary>Pages</summary>

| File | Summary |
| --- | --- |
| [createNewExperiment.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/createNewExperiment/createNewExperiment.js) | Page for creating new experiments. |
| [createNewGesture.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/createNewGesture/createNewGesture.js) | Page for creating new gestures. |
| [demographicForm.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/demographicForm/demographicForm.js) | Page for collecting demographic information. |
| [gesturedisplay.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturedisplay/GestureDisplay.js) | Page for displaying gestures. |
| [gesturemanagement.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/gesturemanagement/gesturemanagement.js) | Page for managing gestures. |
| [labelfeedback.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/labelfeedback/labelfeedback.js) | Page for providing feedback on labels. |
| [mainpage.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/mainpage/MainPage.js) | Main landing page for the application. |
| [movementslib.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/movementslib/movementslib.js) | Page for managing movements library. |
| [tagInstructions.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/tagInstructions/tagInstructions.js) | Page providing instructions for tagging gestures. |
| [userLogin.js](https://github.com/saarazari5/gesturobot/blob/main/src/pages/userLogin/userLogin.js) | User login page. |

</details>

<details closed><summary>Components</summary>

| File | Summary |
| --- | --- |
| [FilterMenu.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/FilterMenu.js) | Component for filtering gestures. |
| [videoWindow/VideoWindow.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/videoWindow/VideoWindow.js) | Component for displaying video content. |
| [gesturesection/gesturesection.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/gesturesection/gesturesection.js) | Component for managing gesture sections. |
| [movment/movment.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/movment/movment.js) | Component representing movements. |
| [gestureLable/gestureLable.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/gestureLable/gestureLable.js) | Component for labeling gestures. |
| [loopOfMovements.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/loopOfMovements/loopOfMovements.js) | Component for looping through movements. |
| [PrivateRoute.js](https://github.com/saarazari5/gesturobot/blob/main/src/components/PrivateRoute/PrivateRoute.js) | Component for handling private routes. |

</details>

<details closed><summary>Databases</summary>

| File | Summary |
| --- | --- |
| [data.json](https://github.com/saarazari5/gesturobot/blob/main/src/databases/data.json) | JSON data for application usage. |
| [emotions.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/emotions.js) | API for managing emotions data. |
| [gesturesAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/gesturesAPI.js) | API for managing gesture data. |
| [movementsAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/movementsAPI.js) | API for managing movements data. |
| [newExperimentAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/newExperimentAPI.js) | API for managing new experiments. |
| [taggersAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/taggersAPI.js) | API for managing taggers. |
| [tazNameTypeAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/tazNameTypeAPI.js) | API for managing Taz name types. |
| [usersAPI.js](https://github.com/saarazari5/gesturobot/blob/main/src/databases/usersAPI.js) | API for managing user data. |

</details>

<details closed><summary>Python</summary>

| File | Summary |
| --- | --- |
| [movements.py](https://github.com/saarazari5/gesturobot/blob/main/src/python/movements.py) | Python script for managing movements. |

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
1.1 install nodeJS via [https://nodejs.org/en]

2. Navigate to the project directory:
```sh
❯ cd gesturobot
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command inside the gesturobot folder:

```sh
json-server --watch src/databases/data.json --port 3005
```
1) do not close the terminal after running this commanad, open a new terminal and run
2) the reason i chose this port is because 3000 will not work on some devices.
3) when the project will have a domain you will also need to define a domain for the json server so differents clients will be able to access it.

```
PORT=3001 npm start
```
or in windows:
```
 set PORT=3001 && npm start
```

###  Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

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

## Important
base url is currently localhost:3005 in order to change that please change params.js parameter under the namse BASE_URL

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
