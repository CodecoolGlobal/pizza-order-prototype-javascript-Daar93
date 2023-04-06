// const orderedPizzasJS = await fetch("http://127.0.0.1:9001/api/order")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
// const orderedPizzasJS = fetch("http://127.0.0.1:9001/api/order")
//     .then(response => response.json())
//     .then(data => console.log(data));
// const ordersRaw = fs.readFileSync(`${__dirname}/../orders.json`, "utf8");
// const order = JSON.parse(ordersRaw);

// console.log(orderedPizzasJS);

const request = await fetch("http://127.0.0.1:9001/api/order")
const data = await request.json();

console.log(data);