const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader.js");
const cors = require("cors");
const app = express();
const cons = require("consolidate");
const apiRouter = require("./routes/api");
const pizzaRouter = require("./routes/pizza"); 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/views")));

const port = 9001;

// console.log(`${__dirname}/../views/index.html`);

app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "html");

app.use("/api", apiRouter);
app.use("/pizza/list", pizzaRouter);

app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/pizza`));
