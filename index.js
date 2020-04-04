const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const config = require("./config");
const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");

const app = express();

mongoose.set('useFindAndModify', false);

mongoose.connect(config.uri, { useNewUrlParser: true }, err => {
    if (err) console.log(err)

    console.log("Mongo client connected");
})

// middleware
app.use(express.json());
app.use(cors());
app.options('*', cors());

// react deployment
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

// api
app.use("/api/user", userRoutes);
app.use("/api/session", sessionRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})