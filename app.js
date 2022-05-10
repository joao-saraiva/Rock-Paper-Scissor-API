const express = require("express");
const app = express();
var cors = require('cors')
const port = 3000;

app.use(cors());

app.get("/teste", (req, res) => {
    res.json({msg: "uepa"})
})

app.get('/', (req, res) => {
    res.send("maluco beleza")
})

app.listen(port, () => {
    console.log("listen")
})
