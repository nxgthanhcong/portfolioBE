const express = require("express");
const route = require("./routes");
const connectDB = require("./configs/db");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

//create app instance
const app = express();

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
app.listen(3000, () => {
    console.log("App run at 3000");
})