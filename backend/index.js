const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const router = require("./routes/customer.route");
console.log(process.env.DB_HOST)
const app = express();

const port = process.env.PORT || 3000;
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, world from nodejs!');
});

app.use("/api/customer", router)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});