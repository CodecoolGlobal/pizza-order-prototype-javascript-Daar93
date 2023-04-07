import { readLocalStorage, writeLocalStorage, clearLocalStorage } from "../../src/storage.js";

async function fetchPizzas() {
  const response = await fetch("/api/pizza");
  const pizzas = await response.json();
  const pizzasJS = JSON.parse(pizzas);

  return pizzasJS;
};

const pizzasJS = await fetchPizzas();


const root = document.querySelector("#root");
const amountOfPizzas = {};

function createHeader() {
  const header = document.createElement("div");
  header.setAttribute("id", "header");

  const h1 = document.createElement("h1");
  h1.innerText = "Mario's πzza";
  header.appendChild(h1);

  return header;
};

function createInput(idName, placeholder) {
  const input = document.createElement("input");
  input.setAttribute("id", idName);
  input.setAttribute("name", idName);
  input.classList.add("input-fields");
  input.setAttribute("placeholder", placeholder);

  return input;
};

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
};

function createTitle() {
  const h1 = document.createElement("h1");
  h1.classList = "title";
  h1.innerText = "Your Order";

  return h1;
};

function createPizzas() {
  const h2 = document.createElement("h1");
  h2.setAttribute("id", "orderedPizzas");

  h2.innerText = "Your Order";

  return h2;
};

function createOrderDisplay() {
  const orderDisplay = document.createElement("div");
  orderDisplay.setAttribute("id", "order-display");
  orderDisplay.style.flexDirection = "column";
  orderDisplay.style.display = "flex";
  orderDisplay.id = "orderedPizzas"

  readLocalStorage()
  .map(ordered => ({pizza: pizzasJS.pizzas.find((pizza) => pizza.id === ordered.pizza_id), amount: ordered.amount}))
  .map((ordered) => {
      const pizzaElem = document.createElement("div");
      pizzaElem.style.display = "flex";
      pizzaElem.style.gap = "5px";

      const nameElem = document.createElement("p");
      nameElem.innerText = ordered.pizza.name + ":";
      
      const amountElem = document.createElement("p");
      amountElem.innerText = ordered.amount;
      pizzaElem.appendChild(nameElem);
      pizzaElem.appendChild(amountElem);

      return pizzaElem;
    })
    .forEach(pizza => orderDisplay.appendChild(pizza));

  return orderDisplay;
};

function createBackgroundImage() {
  const backgroundImage = document.createElement("img");
  backgroundImage.setAttribute("src", "/static/images/background.jpeg");
  backgroundImage.setAttribute("id", "background-image");

  return backgroundImage;
};

function insertInputFieldsTo(element) {
  element.appendChild(createTitle());
  element.appendChild(createOrderDisplay());
  element.appendChild(createInput("name", "Name"));
  element.appendChild(createInput("email", "Email"));
  element.appendChild(createInput("city", "City"));
  element.appendChild(createInput("street", "Street"));
  element.appendChild(createSubmit("submit", "submit"));
};

function createFrom() {
  const form = document.createElement("form");
  form.classList.add("formular");

  insertInputFieldsTo(form);

  return form;
};

function insertElementTo(element, elementToInsert) {
  element.appendChild(elementToInsert);
};

function insertHtmlTree() {
  insertElementTo(root, createHeader());
  insertElementTo(root, createFrom());
  insertElementTo(root, createBackgroundImage());
};

insertHtmlTree();

const submitElement = document.querySelector("#submit");
const formElement = document.querySelector(".formular");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const cityElement = document.querySelector("#city");
const streetElement = document.querySelector("#street");
const personalInformation = {};

formElement.onsubmit = function (event) {
  console.log("submit");
  event.preventDefault();
  const name = nameElement.value;
  const email = emailElement.value;
  const city = cityElement.value;
  const street = streetElement.value;
  

  fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: { name, email, city, street },
      order: readLocalStorage(),
    }),
  })
    .then((response) => {response.json()})
    .then(clearLocalStorage())
    .then(() => window.location.href = "/pizza/list")
};
