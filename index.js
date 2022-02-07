const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const route = require("./routes");
const connectDB = require("./configs/db");
const SortMiddleware = require("./app/middlewares/SortMiddleware");
const PagingMiddleware = require("./app/middlewares/PagingMiddleware");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

//init dotenv
dotenv.config();

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

//sort middleware
app.use(SortMiddleware);
//paging middleware
app.use(PagingMiddleware);

//static middleware
app.use(express.static('public'))

//route configs
route(app);


//view engine configs
app.engine('handlebars', engine({
    extname: ".hdb",
    helpers: require("./ultis/handlebars"),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "resources", "views"));

//app run
app.listen(process.env.PORT || 5000, () => {
    console.log("App start");
})