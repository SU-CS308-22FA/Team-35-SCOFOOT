-CS 308 Team 35 - 202201
# SCOFOOT  

The project name is Scofoot and the URL for our project is https://scofoot.herokuapp.com/. For the football teams competing in the Turkish Super League, a player suggestion service will be established as part of the online app. The purpose of this service is to make football clubs more aware of players with high potential playing in lesser-known leagues.

## Installation
First step is installing npm package manager to your device using [this](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) website.

Then you have to clone the repository to a directory.

```bash
git clone <repository> <directory>
```

After that, going into the directory with the following command.

```bash
cd <directory>
```
Then, open two terminals in your IDE.

For the first terminal, which will be for the frontend side, change its directory to client folder by typing cd client

For the second terminal, no change will be done and this will be used for the server side.

Enter the following command in two terminals to install the packages needed for this project using the package manager [npm] (https://www.npmjs.com).

```bash
npm install
```
After that, run the app in your local host by typing the command below for the client terminal

```bash
npm start 
```
After that, run the app in your local host by typing the command below for the server terminal

```bash
npm run start-dev 
```

After that, you will see "connected to db" on your screen.

The next step will be opening the browser and typing "localhost:'port number'",  to interact with the project from the local host.

## Reporting the Bugs and Offering Suggestion for Fixing

For small bug fixes, opening pull request will be sufficient while for major changes opening an issue is preferred. Besides, before reporting the bug, checking the "Known Bugs" section will be a good choice.


### Known Bugs

1- Users favorite players are shown in the profile page of the user. The user can limit the results by choosing row per page limit and it's default value is 10. However, when it is changed a problem occurs to go to the next page.

## Obtaining the Source Code

### Cloneing the repository
To obtain the source code for the whole project you can
```bash
git clone <repo> <directory>
```
Such that all the files will be ready to be edited or observed. With that, all the directories and the files will be open for being edited and seen. However, it is important not to forget that the client and the server folders are seperated.



### Folder Structure

1. In the root file, there are two main folders which are client and server.
2. Client folder includes the front-end part of the project.
2.1 The main files are located in the src folder, while minor items, such as images, are kept in the public folder. 
2.2 The Src file is made up of mostly screens, reducers, constants, themes, actions, and components. 
2.3 Each screen has its own folder in the Components folder. 
2.3.1 There are components of the respective page in each folder in components.
  
3. Server folder contains the back-end part of the project
3.1 We have three main folders named as Controllers, Models, Middleware and Routes
3.1.1 In the Routes folder, the Controllers that will be used with the given HTTP requests are defined.
3.1.2 The backbone of the backend is built by the Controllers folder, which implements backend functions to fetch and post data to the database.
3.1.3 The project's schemas, including the Players and User schemas, are located in the models folder.
3.1.4 Operations such as authentication for user login are located in the Middleware folder.
3.2  Index.js and package.json are located in the server folder as well in which we make the connection with the database in index.js and store the package versions in package.json .

    

### How to Build the project

After cloneing the project with
```bash
git clone <repo> <directory>
```
go to the project directory and run
```bash
npm install --prefix client && npm run build --prefix client
```


### Deploying the project to a remote server (Heroku)

### Install Heroku

1 . Create an account on **[https://heroku.com](https://heroku.com)**. This should be pretty straight forward.
2 . Install the Heroku CLI on your computer: <br/>**[https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)**. 
Check that you have the `heroku-cli` installed by checking the version number in your terminal:
```bash
heroku --version
```

3 . Connect the `Heroku CLI` to your account by writing the following command in your terminal and follow the instructions on the command line:
```bash
heroku login
```
_Use your credentials from the earlier account creation._

### Deploy the project

1 . Heroku will look for a startup-script, this is by default `npm start` so make sure you have that in your `package.json` (assuming your script is called `app.js`):
```json
 "scripts": {
    "start" : "node app.js"
 }
```

2 . You also have to make changes to the port, you can't hardcode a dev-port. But you can reference herokus port without knowing it by a special variabel. So add the following to your code:
```js
const port = process.env.PORT || 4000;
```
When you upload to Heroku it will use the environment-port but when you are developing it will use the port 4000. Then reference this port in your app:
```js
app.listen(port);
```

3 . Then create a remote heroku project, kinda like creating a git repository on GitHub. This will create a project on Heroku with a random name. If you want to name your app you have to supply your own name like `heroku create project-name`. The command below will just create a random name:
```bash
heroku create
```

4 . Push your app to __Heroku__ like pushing to GitHub expect for `origin` you have `heroku` (you will see a wall of code).
```bash
git push heroku main
```

5 . Visit your newly create app by opening it via heroku:
```bash
heroku open
```


If you are getting errors you can view the error logs by running this command:
```bash
heroku logs --tail
```

This might give you a hint on what's wrong.


