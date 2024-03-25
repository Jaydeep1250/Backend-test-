const express = require('express');

const app = express();
const path = require('path');
const apirouter = require('./api/users/router/api.router');
/* const expressLayouts = require('express-ejs-layouts'); */
var bodyParser = require('body-parser');
// const upload = require('express-fileupload');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', apirouter);

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
// app.use(upload());


app.set('layout', 'layout/layout');
/* app.use(expressLayouts); */

app.use(express.static(__dirname + '/public'));

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));