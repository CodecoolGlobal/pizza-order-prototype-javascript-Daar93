const root = document.getElementById("root");
async function fetchPizzas() {
    const response = await fetch("http://127.0.0.1:9001/api/pizza");
    const pizzas = await response.json();
    // waits until the request completes...
    const pizzasJS = JSON.parse(pizzas);

    return pizzasJS;
};
// const pizzasJS = await JSON.parse(fetchPizzas());
const pizzasJS = await fetchPizzas();
const orders = [];
console.log(pizzasJS);

function insertElementTo(element, elementToInsert) {
    element.appendChild(elementToInsert);
};

function createHeader() {
    const header = document.createElement("div");
    header.setAttribute("id", "header");

    const h1 = document.createElement("h1");
    h1.innerText = "Mario's πzza";
    header.appendChild(h1);

    const button = document.createElement("a");
    button.innerText = "Your Order!";
    button.setAttribute("href", "http://127.0.0.1:9001/api/order")
    button.setAttribute("id", "order-button");
    header.appendChild(button);


    return header;
};

function createContainer() {
    const container = document.createElement("div");
    container.setAttribute("class", "container");

    const row = document.createElement("div");
    row.setAttribute("class", "row");
    container.appendChild(row);

    return container;
};

function createBackgroundImage() {
    const backgroundImage = document.createElement("img");
    backgroundImage.setAttribute("src", "/frontend/images/background.jpeg");
    backgroundImage.setAttribute("id", "background-image");

    return backgroundImage;
};

function insertHtmlTree() {
    insertElementTo(root, createHeader());
    insertElementTo(root, createContainer());
    insertElementTo(root, createBackgroundImage());
};

insertHtmlTree();

const row = document.querySelector(".row");
const ordersButton = document.querySelector("#order-button");

function createAllergens(container) {
    const allergens = document.createElement("h6");
    allergens.setAttribute("id", "allergens");
    container.appendChild(allergens);
};

function createIngredients(allIngredients) {
    const ingredients = document.createElement("h6");
    ingredients.setAttribute("id", "ingredients");
    ingredients.innerText = allIngredients;

    return ingredients;
};

function createCard(pizzas, nameOfPizza, pizzaPrice, index) {
    if(index === 3) {
        root.insertAdjacentHTML("beforeend", "<br>");
    }

    const pizza = document.createElement("div");
    pizza.setAttribute("class", "pizza");
    pizza.classList.add("col-sd-12");
    pizza.classList.add("col-md-4");
    row.appendChild(pizza);

    const pizzaName = document.createElement("h4");
    pizzaName.setAttribute("id", "pizza-name");
    pizzaName.innerText = nameOfPizza;
    pizza.appendChild(pizzaName);

    const ingredientsString = pizzas.ingredients.reduce((string, ingredient, index) => {
        return string + ingredient + "<br>"
    }, "");

    pizza.insertAdjacentHTML("beforeend", `<h6>${ingredientsString}</h6>`);

    const allergens = pizzas.allergens.reduce((string, allergen, index) => {
        if(index === 0) {
            return string + " " + allergen;
        } else {
            return string + "," + " " + allergen;
        }
    }, "");

    pizza.insertAdjacentHTML("beforeend", allergens);

    const price = document.createElement("h4");
    price.setAttribute("id", "price");
    price.innerText = pizzaPrice + "$";
    pizza.appendChild(price);

    const input = document.createElement("input");
    input.setAttribute("id", `input${index + 1}`);
    input.setAttribute("class", "input");
    input.setAttribute("placeholder", "Amount of Pizzas");
    pizza.appendChild(input);

    const button = document.createElement("button");
    button.innerText = "Add to order";
    button.setAttribute("id", index + 1);
    button.setAttribute("class", "add-to-order-button")
    pizza.appendChild(button);

    button.addEventListener("click", event => {
        console.log("CLICK");
        const id = parseInt(event.target.id) - 1;
        
        const input = document.querySelector(`#input${id + 1}`);
        const amount = parseInt(input.value);
        
        if(isFinite(amount)) {

                
            for(let i = 0; i< amount; i++) {
                orders.push(pizzasJS.pizzas[id]);
            }
        }
    });

    return pizza;
};

ordersButton.addEventListener("click", event => {

    fetch("http://127.0.0.1:9001/pizza/list", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(orders)
    })
        .then(response => response.json())
        .then(data => {
    });
});

// Generate HTML
fetch("http://127.0.0.1:9001/api/pizza")
    .then(response => response.json())
    .then(data => {
        const pizza = JSON.parse(data);
        pizza.pizzas.map((pizza, index) => {
            insertElementTo(row, createCard(pizza, pizza.name, pizza.price, index));
        });
    });


