const express = require('express');
const morgan = require('morgan');

const app = express();
const path = require('path');

//Settings
app.set('port', process.env.PORT || 2424) 

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})  