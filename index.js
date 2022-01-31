const express = require("express");
const route = require("./routes");
const connectDB = require("./configs/db");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

//create app instance
const app = express();


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//enable cors
var corsOptions = {
    // origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//connect datababse
connectDB();

//Middleware for POST method
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

//static middleware
app.use(express.static('public'))

//route configs
route(app);


//view engine configs
app.engine('handlebars', engine({
    extname: "hdb",
    helpers: {

    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "resources", "views"));

//app run
app.listen(3001, () => {
    console.log("App run at 3001");
})