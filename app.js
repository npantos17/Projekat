const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    res.send("Hello worlds");
    console.log(req);
})

app.get("/test", (req, res)=>{
    res.send("Hello test");
    console.log(req);
})

app.listen(8000);