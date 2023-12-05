const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handleBars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
const databaseUrl = 'mongodb://localhost:27017/F8Courses';
db.connect(databaseUrl);


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//Setup morgan
app.use(morgan('combined'));

//Setup view engine with handlebars
app.engine('hbs', handleBars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/`);
});
