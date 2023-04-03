// fetch("./backend/pizzas.json", {
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//     },
// })
//     .then(response => response.json())
//     .then(response => console.log(JSON.stringify(response)))
const fs = require("fs");

const pizzas = fs.readFileSync("./backend/pizzas.json", "utf8");
console.log(pizzas);

// console.log("HAllooo");

// const root = document.getElementById("root");

// root.insertAdjacentHTML("beforeend", "<button>");