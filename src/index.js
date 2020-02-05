const express = require('express');
const morgan = require('morgan');

const app = express();
const path = require('path');

//Settings
app.set('port', process.env.PORT || 3030)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})