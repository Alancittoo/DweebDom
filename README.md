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
