const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//import routes
var cors = require('cors')
const userRoute = require("./routes/user")
const categoryRoute = require("./routes/category")
const laptopRoute = require("./routes/laptop")
const orderRoute = require("./routes/order")
const orderDetailRoute = require("./routes/order_detail")
const brandRoute = require("./routes/brand")

app.use(cors())

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/laptop', laptopRoute);
app.use('/order', orderRoute);
app.use('/order-detail', orderDetailRoute);
app.use('/brand', brandRoute);

//database
async function connect() {
    try {
        await mongoose.connect(
            process.env.DB_URL
        );
        console.log("connect successfully")
    } catch (error) {
        console.log(error);
    }
}

//listen to server
app.listen(process.env.PORT || 5000, async() => {
    console.log(process.env.DB_URL);
    await connect();
});