 # Tech-Blog </br>
  
## Description 
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) </br>
This is an CMS-style blog app that allows users to either sign in or sign-up and create blog posts, and engage with other users of the app by commenting on posts. Users are able to comment on other users posts, edit their posts, and delete their posts. Users  are also able to delete their comments on other users posts. This app was built following the Model View Controller framework.


## Table of Contents
- [Features](#features)
- [Link to Deployed App](#link-to-deployed-app)
- [Technologies](#technologies)
- [ScreenShot](#screenshot)
- [License](#license)
- [Questions](#questions)

## Features 
  This app allows signed-in users to create, edit, and delete their posts while on their dashboard page. Users can navigate to the homepage, where they will see all posts made by every user, they are able to see when the post was created and the username of the user who wrote it. The signed-in user will also be able to see the amount of comments on the post, or see "Add A Comment" if the post has no comments. Use is then able to click on the comment link and is taken to a page with the specific post, see all the comments, if any, add a comment and is able to delete their own comment. 

  User session ends after 10 min of inactivty, but does reset when the user makes any request. 

## Link to Deployed App
The app is deployed on [Heroku](https://tech-blog-ji.herokuapp.com/).

## Technologies
Technologies used to create an MVC App:
- Node.js Express.js was used to create a RESTful API.
- Express Session npm package was used for user authentication.
- MySQL AND Sequelize ORM was used to create the database.
- Handlebars.js was used as the template engine for this app.
- bcrypt to has user passwords, dotenv was used to store enviornment variables.

## Screenshot
I chose a minimilistic styling approach. <br>
<img width="500" alt="homepage" src="https://user-images.githubusercontent.com/84414488/137014528-51c02354-173e-4b16-bf6f-50b43292e8b0.png">
<img width="500" alt="comment" src="https://user-images.githubusercontent.com/84414488/137014569-394de468-30d1-4e76-a59f-abe1a6251a20.png">
<img width="500" alt="dashboard" src="https://user-images.githubusercontent.com/84414488/137014576-695393e7-b2ad-4d6f-92db-221597f57871.png">


## License 
  This project is covered by the license of: [MIT](https://opensource.org/licenses/MIT)

## Questions
  If you have any questions or would like to discuss this application further, please reach out to me via email at [here](mailto:j.iqal35@gmail.com) or visit my github profile at [janetiqal](http://www.github.com/janetiqal).

### Created by Janet Iqal
