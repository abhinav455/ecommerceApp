//serve react build
const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname, "/build"))); //express should understand the path //middleware to serve other static files

app.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, host, (_)=> console.log(`react app is listening on port ${port}`));




