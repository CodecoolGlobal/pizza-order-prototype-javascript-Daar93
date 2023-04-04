fetch("http://127.0.0.1:9001/api/pizza")
    .then(response => response.json())
    .then(response => {
        console.log(response);
})
// const fs = require("fs");

// const pizzas = fs.readFileSync("./backend/pizzas.json", "utf8");
// console.log(pizzas);

console.log("HAllooo");

// const root = document.getElementById("root");

// root.insertAdjacentHTML("beforeend", "<button>");