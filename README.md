# Realtime chat server

## Table of Contents
<details>
  <summary>Click to expand</summary>

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation and Usage](#installation-and-usage)
- [Gallery](#gallery)
- [License](#license)

</details>

## Introduction
Realtime chat server is a part of the project Realtime chat app

- [Realtime chat client](https://github.com/thanhplassma/chat-client)
- [Realtime chat server](https://github.com/thanhplassma/chat-engine)
- ReactJS to build up the front-end
- ExpressJS to create RESTful API
- MongoDB database to store data
<div align="center">
    <img src="./res/app-stack.png" alt="app-stack"/>
</div>

## Tech Stack
<!-- Front-end -->
<div align="center">
  <a href="https://react.dev/" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/></a> 
  <a href="https://reactrouter.com" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/></a> 
  <a href="https://ant.design" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white"/></a>
</div>
<!-- Back-end -->
<div align="center">
<a href="https://socket.io/" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white"/></a>
  <a href="https://nodejs.org" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/></a>
  <a href="https://expressjs.com" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/></a>
  <a href="https://jwt.io" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/></a>
<a href="https://www.npmjs.com" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/></a>
</div>

<!-- Database -->
<div align="center">
    <a href="https://redis.io/" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white"/></a>
<a href="https://www.mongodb.com" target="blank" rel="noreferrer"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/></a>  
</div>

## Features
The website provides basic features such as:
- Realtime chat
- Login account
- Search for friends


## Installation and Usage
To run this project, you first need to install [Node.js](https://nodejs.org) and [Git](https://git-scm.com/downloads) on your computer. Then, follow these steps:
1. After cloning this repository, navigate to the project directory
```bash
cd chat-engine
```
2. Install dependencies and wait for the installation to finish
```bash
npm install
```
3. Run the project
```bash
npm start
```
4. Open your browser and go to `https://localhost:5000`
* Note: check out .env.example file to see the environment variables

## Gallery
<div align="center">
    <img width="50%" src="./res/home-page.png" alt="home-page"/>
    <p>Home page</p>
</div>
<div align="center">
    <img width="50%" src="./res/login-page.png" alt="login-page"/>
    <p>Login page</p>
</div>
<div align="center">
    <img width="50%" src="./res/admin-dashboard.png" alt="admin-dashboard"/>
    <p>Admin dashboard</p>
</div>

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## References

