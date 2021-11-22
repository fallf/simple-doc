const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const nodemailer = require('nodemailer');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//register new function
hbs.handlebars.registerHelper('ifCond', function(v1, options) {
    if(v1 === 1) {
        return options.fn(this);
    }
    return options.inverse(this);
}) 

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess))
//turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() =>{
    app.listen(PORT, () => console.log('Now Listening'));
})