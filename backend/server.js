const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader.js");
const filePath = path.join(`${__dirname}/pizzas.json`);
const cors = require("cors");
const app = express();
const fs = require("fs");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 9001;
const router = express.Router();

// const ip = "127.0.0.1";
console.log("Hallo")

app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/pizza`));