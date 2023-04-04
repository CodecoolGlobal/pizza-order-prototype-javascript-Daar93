const express = require("express")
const router = express.Router()

router.get("/pizza",(req, res) => {
    res.json(pizzas);
});

router.get("/allergene", (req, res) => {
    res.json(allergene)
})