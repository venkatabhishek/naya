# Naya Studio Task

Full-stack Signup and Onboarding Web app

# General Flow

The application contains a basic authentication system that utilizes encryption (bcrypt) and json-web-tokens. Users start by registering for an account (which consists of just an email and password). Upon registering, users are immediatly launched into the onboarding process which is just a series of questions. These questions are defined in `questions.json`, where each key represents a role, and the value is an array of questions associated with that role. Selecting multiple roles will present the questions for each role to the user. The user is then redirected to a home page where they can view the results of their session. At any time, the user can also simply login to their account which also redirects them to the home page. The user can redo/start the onboarding questions from the home page as well.

# Directory Organization

`routes` - API for handling (create, read, etc.) users and onboarding sessions  
`models` - Mongoose (MongoDB) models for users and onboarding sessions  
`index.js` - Entry point - contains express server and connected to database  
`questions.json` - Questions to ask user in onboarding session; Keys represent roles, values represent questions for that role  
`client` - React Frontend  
`config` - Contains MongoDB connection URI and JWT secret

# Tools

MERN stack

Database - MongoDB is utilized through [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), a hosted MongoDb service

Backend - Node.js with Express

Frontend - React bootstrapped with Create React App

Deployment - Heroku

# Local development

Clone repo

`git clone https://github.com/venkatabhishek/naya.git`

Install deps

`npm run client-install && npm install`

Run development servers

`npm run dev`

(NOTE: This will run React app on port 3000, and server on port 4000; react app uses proxy in development)