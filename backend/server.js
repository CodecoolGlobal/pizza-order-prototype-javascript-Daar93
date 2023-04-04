const express = require("express");
const path = require("path");
const fileReaderAsync = require("./fileReader.js");
const filePath = path.join(`${__dirname}/pizzas.json`);
const cors = require("cors");
const app = express();
const fs = require("fs");
const cons = require("consolidate");
const router = express.Router();
const pizzasRaw = fs.readFileSync(`${__dirname}/pizzas.json`, "utf8");
const pizzas = JSON.parse(pizzasRaw)
const allergeneRaw = fs.readFileSync(`${__dirname}/allergene.json`, "utf8")
const allergene = JSON.parse(allergeneRaw)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));
// app.use('/public', express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "../frontend")));

const port = 9001;

console.log(`${__dirname}/../views/index.html`);

app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.get("/pizza/list",(req, res) => {
    res.render(path.join(`${__dirname}/../views/index.html`));
});

app.get("/api/pizza",(req, res) => {
    res.json(pizzas);
});

app.get("/api/allergene", (req, res) => {
    res.json(allergene)
})

app.use(express.static(`${__dirname}/../views`));

console.log(__dirname);
// router
//   .route("/:id") 
//   .get((req, res) => {
//     console.log(req.user);
//     res.send(req.user);
//     res.send(`Get Package With ID ${req.params.id}`);
//   })
//   .put((req, res) => {
//     res.send(`Update Package With ID ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     res.send(`Delete Package With ID ${req.params.id}`);
//   })

// router.param("id", (req, res, next, id) => {
//   console.log(id);
//   req.user = JSON.stringify(packagesJS.packages[id - 1]);
//   next();
// });



app.listen(port, () => console.log(`http://127.0.0.1:${port}/api/pizza`));

// app.use("/api/package", router);