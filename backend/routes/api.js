const express = require("express");
const path = require("path");
const filePath = path.join(`${__dirname}/pizzas.json`);
const router = express.Router();
const fs = require("fs")
const pizzasRaw = fs.readFileSync(`${__dirname}/../pizzas.json`, "utf8");
const allergeneRaw = fs.readFileSync(`${__dirname}/../allergene.json`, "utf8");
const ordersRaw = fs.readFileSync(`${__dirname}/../orders.json`, "utf8");

router.get("/pizza",(req, res) => {
    res.json(pizzasRaw);
});

router.get("/allergene", (req, res) => {
    res.json(allergeneRaw);
});

router.get("/order/list", (req, res) => {
    console.log(ordersRaw)
    res.json(ordersRaw);
});

router.get("/order", (req, res) => {
    res.render(path.join(`${__dirname}/../views/userInput.html`));
});

module.exports = router;