//index.js

const express = require("express");
const cors = require('cors')
const routes = require('./routes')
let app = express();
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');

const config = require("./config");

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.use(cookieParser(config.cookie_secret))

//server settings
const PORT = 8003;
const path = require("path");
const bodyParser = require("body-parser");

//Parse data with connect-multiparty. 
app.use(formData.parse({}));
//Delete from the request all empty files (size == 0)
app.use(formData.format());
//Change the file objects to fs.ReadStream 
app.use(formData.stream());
//Union the body and the files
app.use(formData.union());

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use(router);
const rootPath = path.resolve("./dist");

app.use(express.static(rootPath));
routes(app, router)

app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
});