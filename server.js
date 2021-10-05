const express = require('express');
const path= require("path")
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers= require("./utils/helpers")
require('dotenv').config()

const sequelize = require('./config/connection');
const routes = require('./controllers');


const app = express();
const PORT = process.env.PORT || 3001;

//custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {
      // session is set to 10min before expiration
      maxAge: 600000
    },
    resave: false,
    //session exipiration resets everytime a request is made by user
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});