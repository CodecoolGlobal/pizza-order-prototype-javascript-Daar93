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

const root = document.querySelector("#root");
const amountOfPizzas = {};

function createHeader() {
  const header = document.createElement("div");
  header.setAttribute("id", "header");

  const h1 = document.createElement("h1");
  h1.innerText = "Mario's πzza";
  header.appendChild(h1);

  // const button = document.createElement("button");
  // button.innerText = "Your Order!";
  // button.setAttribute("id", "order-button");
  // header.appendChild(button);

  return header;
}

function createInput(idName, placeholder) {
  const input = document.createElement("input");
  input.setAttribute("id", idName);
  input.setAttribute("name", idName);
  input.classList.add("input-fields");
  input.setAttribute("placeholder", placeholder);

  return input;
}

function createSubmit(idName, placeholder) {
  const input = document.createElement("input");
  input.setAttribute("id", idName);
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Send");
  input.classList.add("input-fields");
  input.classList.add("add-to-order-button");
  input.innerText = "submit";
  input.setAttribute("placeholder", placeholder);

  return input;
}

function createTitle() {
  const h1 = document.createElement("h1");
  h1.classList = "title";
  h1.innerText = "Your Order";

  return h1;
}

function createPizzas() {
  const h2 = document.createElement("h1");
  h2.setAttribute("id", "orderedPizzas");

  h2.innerText = "Your Order";

  return h2;
}

function createBackgroundImage() {
  const backgroundImage = document.createElement("img");
  backgroundImage.setAttribute("src", "/frontend/images/background.jpeg");
  backgroundImage.setAttribute("id", "background-image");

  return backgroundImage;
}

function insertInputFieldsTo(element) {
  element.appendChild(createTitle());
  element.appendChild(createPizzas());
  element.appendChild(createInput("name", "Name"));
  element.appendChild(createInput("email", "Email"));
  element.appendChild(createInput("city", "City"));
  element.appendChild(createInput("street", "Street"));
  element.appendChild(createSubmit("submit", "submit"));
}

function createFrom() {
  const form = document.createElement("form");
  form.classList.add("formular");

  insertInputFieldsTo(form);

  return form;
}

function insertElementTo(element, elementToInsert) {
  element.appendChild(elementToInsert);
}

insertElementTo(root, createHeader());
insertElementTo(root, createFrom());
insertElementTo(root, createBackgroundImage());

function countNumberOfPizzas(orderedPizzas, comparePizza) {
  let filteredPizzas = orderedPizzas.filter((pizza) => pizza === comparePizza);
  let numberOfPizzas = filteredPizzas.length;
  return numberOfPizzas;
}

function countPizzas(orderedPizzas) {
  const setOfPizzas = new Set(orderedPizzas);
  const uniquePizzas = Array.from(setOfPizzas);

  for (let kindOfPizza of uniquePizzas) {
    let numberOfPizzas = countNumberOfPizzas(orderedPizzas, kindOfPizza);
    amountOfPizzas[kindOfPizza.name] = numberOfPizzas;
  }
  return amountOfPizzas;
}

fetch("http://127.0.0.1:9001/api/order/list")
  .then((data) => data.json())
  .then((data) => {
    const pizzasElement = document.querySelector("#orderedPizzas");
    const orderedPizzas = JSON.parse(data);
    const pizzaTextWithCurlyBraces = JSON.stringify(
      countPizzas(orderedPizzas)
    ).replace(/"/g, "");
    const pizzaTextWithCurlyBrace = pizzaTextWithCurlyBraces.replace(/{/g, "");
    const pizzaTextWithOutCurlyBracesWithoutWhiteSpace =
      pizzaTextWithCurlyBrace.replace(/}/g, "");
    const pizzaTextWithOutCurlyBracesWithWhiteSpace =
      pizzaTextWithOutCurlyBracesWithoutWhiteSpace.replace(/,/g, ", ");
    const pizzaTextWithOutCurlyBracesWithOutDoubleWhiteSpace =
      pizzaTextWithOutCurlyBracesWithWhiteSpace.replace(/:/g, ": ");

    pizzasElement.innerHTML =
      pizzaTextWithOutCurlyBracesWithOutDoubleWhiteSpace;
  });

const submitElement = document.querySelector("#submit");
const formElement = document.querySelector(".formular");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const cityElement = document.querySelector("#city");
const streetElement = document.querySelector("#street");
const personalInformation = {};

formElement.onsubmit = function (event) {
  event.preventDefault();
  const name = nameElement.value;
  const email = emailElement.value;
  const city = cityElement.value;
  const street = streetElement.value;

  personalInformation.pizzas = amountOfPizzas;
  personalInformation.contact.name = name;
  personalInformation.contact.email = email;
  personalInformation.contact.city = city;
  personalInformation.contact.street = street;

  fetch("http://127.0.0.1:9001/orderInformation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personalInformation),
  })
    .then((response) => response.json())
    .then((data) => {});
};
