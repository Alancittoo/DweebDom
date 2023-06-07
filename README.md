# DweebDom
DweebDom is a full stack project clone of pinterest. It allows users to create pins and boards of their interests with others. Here on this site users can connect with others 
  Check Out DweebDom Here! https://weebdom.onrender.com

## This is what makes DweebDom run !

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Python](https://img.shields.io/badge/Python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-%23FCA121.svg?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## SplashPage / Login & Signup

![splashpage](https://github.com/Alancittoo/DweebDom/assets/98733614/46ed568a-ebe5-455c-94cc-8c27676cafd2)

## Viewing all pins / a single pin

![pins](https://github.com/Alancittoo/DweebDom/assets/98733614/00166352-5bab-46c8-b333-e180372b5c65)

## Creating a new pin

![createpin](https://github.com/Alancittoo/DweebDom/assets/98733614/ee95eac6-c49f-4bdc-b0f8-567743f16d47)

## All boards / creating a board / viewing a single board

![boards](https://github.com/Alancittoo/DweebDom/assets/98733614/ec997814-5a6b-4e27-873e-8b9eee20acd2)




# Routes 

## Board Routes
### /allBoards/<int:user_id>
   * GET method
   * returns all the boards in the db for that user
   * Body:
      ```  
      {
        "description": "Gaming stuff",
        "id": 4,
        "is_public": true,
        "pins": [],
        "title": "Gaming",
        "user_id": 3
       },
      {
        "description": "Something I might wanna try later",
        "id": 5,
        "is_public": true,
        "pins": [],
        "title": "Foods",
        "user_id": 3
       },
      {
        "description": "Only cute animals",
        "id": 6,
        "is_public": true,
        "pins": [],
        "title": "Pets",
        "user_id": 3
        } 
        ```

### /<int:board_id>
   * GET method
   * returns one specific board for that user
   * Body:
     ```
      {
        "description": "Gaming stuff",
        "id": 4,
        "is_public": true,
        "pins": [],
        "title": "Gaming",
        "user_id": 3
      } 
      ```
      
### /createBoard 
   * POST method
   * Creates a new board for that user
   * Body:
     ```
     {
     "title": "Random stuff",
     "description": "more stuff",
     "is_public": true
      }
     ```
     
 ### /<int:board_id> 
   * PUT method
   * Updates a board for that user
   * Body:
     ```
     {
     "title": "Random stuff pt2",
     "description": "more stuff pt2",
     "is_public": false
      }
     ```    
     
 ### /delete/<int:board_id>
   * DELETE method
   * Delete a specific board from the users boards
   * Body: none
     
### /<int:board_id>/pins/<int:pin_id>
   * POST method
   * Adds a certain pin to a board the user choses
   * Body: 
      ```
      
      ```
      
      
### /<int:board_id>/pins/<int:pin_id>
   * DELETE method
   * Removes a certain pin to a board the user choses
   * Body: 
      ```
      
      ```
     
     

## Pin Routes

### /allPins
* GET method
* gets all pins in the db
* Body:
  ```
  {
    "Pins": [
        {
            "description": "Modern Hunter x Hunter",
            "id": 1,
            "image_url": "https://i.pinimg.com/236x/c0/37/c3/c037c3126d2a9eec910a8724aed0e8fa.jpg",
            "title": "Killua and Pepsi",
            "user_id": 1
        },
        {
            "description": "I saw this and I was wondering which anime its from?",
            "id": 2,
            "image_url": "https://i.pinimg.com/originals/01/b6/4e/01b64e2500a03c4ccc366be8e48ff629.gif",
            "title": "Anime ?",
            "user_id": 1
        },
        {
            "description": "Miss the old days",
            "id": 3,
            "image_url": "https://i.pinimg.com/originals/68/2c/2a/682c2a37425ebf4fbdb75917519f8cb5.gif",
            "title": "Nostalgic",
            "user_id": 1
        },
        {
            "description": "This guys is too badass!",
            "id": 4,
            "image_url": "https://i.pinimg.com/originals/4e/af/4b/4eaf4b191d08b09368134f4f8939c277.gif",
            "title": "Madara",
            "user_id": 1
        },
        {
            "description": "10 points to whoever can",
            "id": 5,
            "image_url": "https://i.pinimg.com/originals/12/15/cf/1215cfe54d09014ca375975c540dbf79.gif",
            "title": "Can you guess this iconic anime?",
            "user_id": 1
        }
   ```


### /singlePin/<int:pin_id>
* GET method
* gets specific pin the user clicks on
* Body:
   ```
   {
    "description": "Miss the old days",
    "id": 3,
    "image_url": "https://i.pinimg.com/originals/68/2c/2a/682c2a37425ebf4fbdb75917519f8cb5.gif",
    "title": "Nostalgic",
    "user_id": 1
   }
   ```
   
   
### /newPin
* POST method
* Creates new pin by user
* Body:
   ```
   {
    "image_url": "https://i.pinimg.com/236x/84/52/91/845291bbe014b60aa44dd79a4b347a45.jpg",
    "title": "Amazing lil pink dude",
    "description": "Kirby"
   }
   ```
   
   
### /update/<int:pin_id>
* PUT method
* updates data of the pin the user choses
* Body:
   ```
   {
    "image_url": "https://i.pinimg.com/236x/bd/92/50/bd92506ff399940f43beb4bb01244ee4.jpg",
    "title": "KIRBY IS AWESOME",
    "description": "Nobody can body kirby"
   }
   ```
   
### /delete/<int:pin_id>
* DELETE method
* Deletes a pin from the user
* Body: none


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
