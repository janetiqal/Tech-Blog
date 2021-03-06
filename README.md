 # Tech-Blog </br>
  
## Description 
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) </br>
This is an CMS-style blog app that allows users to either sign in or sign-up and create blog posts, and engage with other users of the app by commenting on posts. Users are able to comment on other users posts, edit their posts, and delete their posts. Users are also able to delete or edit their comments on other users posts. This app was built following the Model View Controller framework using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.


## Table of Contents
- [Features](#features)
- [Link to Deployed App](#link-to-deployed-app)
- [Technologies](#technologies)
- [User Story](#user-story)
- [ScreenShot](#screenshot)
- [License](#license)
- [Questions](#questions)

## Features 
This app allows signed-in users to create, edit, and delete their posts while on their dashboard page. Users, logged in or not, can view the homepage, where they will see all posts made by every user, they are able to see when the post was created and the username of the user who wrote it. Users will also be able to see the amount of comments on the post, or see "Add A Comment" if the post has no comments. All users are able to click on a post and see the comments associated with it. Logged in users are able to add a comment to a post and are able to edit or delete their own comment. 

  User session ends after 10 min of inactivty, but does reset when the user makes any request. 

## Link to Deployed App
The app is deployed on [Heroku](https://tech-blog-ji.herokuapp.com/).

## Technologies
- Node.js Express.js was used to create a RESTful API.
- Express Session npm package was used for user authentication.
- MySQL AND Sequelize ORM was used to create the database.
- Handlebars.js was used as the template engine for this app.
- bcrypt to has user passwords, dotenv was used to store enviornment variables.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Screenshot
I chose a minimilistic styling approach.
<br><br>
<img width="500" alt="homepage" src="https://user-images.githubusercontent.com/84414488/137014528-51c02354-173e-4b16-bf6f-50b43292e8b0.png"> <br>
<img width="500" alt="comment" src="https://user-images.githubusercontent.com/84414488/137021531-d576f4ba-c785-4b94-84ae-93031ded898e.png"><br>
<img width="500" alt="dashboard" src="https://user-images.githubusercontent.com/84414488/137014576-695393e7-b2ad-4d6f-92db-221597f57871.png">



## License 
  This project is covered by the license of: [MIT](https://opensource.org/licenses/MIT)

## Questions
  If you have any questions or would like to discuss this application further, please reach out to me via email at [here](mailto:j.iqal35@gmail.com) or visit my github profile at [janetiqal](http://www.github.com/janetiqal).

### Created by Janet Iqal
