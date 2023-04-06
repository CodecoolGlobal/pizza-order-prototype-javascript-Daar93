const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader.js");
const cors = require("cors");
const app = express();
const cons = require("consolidate");
const apiRouter = require("./routes/api");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("frontend"));
app.use("/pizza/list", express.static("frontend/src/list"));
app.use("/order", express.static("frontend/src/order"));

const port = 9001;

app.use("/api", apiRouter);

app.listen(port, () => console.log(`http://127.0.0.1:${port}/pizza/list`));
