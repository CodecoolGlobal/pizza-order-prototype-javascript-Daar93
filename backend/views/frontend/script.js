const root = document.getElementById("root");
const pizzasJS = await fetch("http://127.0.0.1:9001/api/pizza")
    .then(response => response.json());
const orders = [];

// console.log(pizzas);

function insertElementTo(element, elementToInsert) {
    element.appendChild(elementToInsert);
};

function createHeader() {
    const header = document.createElement("div");
    header.setAttribute("id", "header");

    const h1 = document.createElement("h1");
    h1.innerText = "Mario's Pizza";
    header.appendChild(h1);

    const button = document.createElement("button");
    button.innerText = "Your Order Oida!";
    button.setAttribute("id", "order-button");
    button.innerText = "Your Order Oida!";
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
    pizza.setAttribute("id", "pizza");
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

    const button = document.createElement("button");
    button.innerText = "Order";
    button.setAttribute("id", index + 1);
    pizza.appendChild(button);

    button.addEventListener("click", event => {
        console.log("CLICK");
        const id = parseInt(event.target.id) - 1;
        // console.log(id);
        orders.push(pizzasJS.pizzas[id]);

        console.log(orders);
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
            console.log(data);
            self.location.href = "http://127.0.0.1:9001/api/order";
    });
});


fetch("http://127.0.0.1:9001/api/pizza")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.pizzas.map((pizza, index) => {
            insertElementTo(row, createCard(pizza, pizza.name, pizza.price, index));
        });
    });


