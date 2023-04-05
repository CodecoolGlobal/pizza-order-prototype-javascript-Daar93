const express = require("express");
const path = require("path");
const filePath = path.join(`${__dirname}/pizzas.json`);
const router = express.Router();
const fs = require("fs")
const pizzasRaw = fs.readFileSync(`${__dirname}/../pizzas.json`, "utf8");
const pizzas = JSON.parse(pizzasRaw);
const allergeneRaw = fs.readFileSync(`${__dirname}/../allergene.json`, "utf8");
const allergene = JSON.parse(allergeneRaw);
const ordersRaw = fs.readFileSync(`${__dirname}/../orders.json`, "utf8");
const order = JSON.parse(ordersRaw);

router.get("/pizza",(req, res) => {
    res.json(pizzas);
});

router.get("/allergene", (req, res) => {
    res.json(allergene);
});

router.get("/order", (req, res) => {
    res.render(path.join(`${__dirname}/../views/userInput.html`));
    // res.json(order);
});


module.exports = router;