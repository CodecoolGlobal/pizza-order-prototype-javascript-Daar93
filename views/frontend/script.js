const root = document.getElementById("root");

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
    
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", `card`);
    cardDiv.style.backgroundImage = `url(${pizzas.img})`;

    const container = document.createElement("div");
    container.setAttribute("id", "container");
    cardDiv.appendChild(container);

    const pizzaName = document.createElement("h4");
    pizzaName.setAttribute("id", "pizza-name");
    pizzaName.innerText = nameOfPizza;
    container.appendChild(pizzaName);

    const ingredientsString = pizzas.ingredients.reduce((string, ingredient, index) => {
        return string + ingredient + "<br>"
    }, "");
    console.log(ingredientsString);
    container.insertAdjacentHTML("beforeend", `<h6>${ingredientsString}</h6>`);

    const allergens = pizzas.allergens.reduce((string, allergen) => {
        return string + " " + allergen;
    }, "");

    container.insertAdjacentHTML("beforeend", allergens);

    const price = document.createElement("h4");
    price.setAttribute("id", "price");
    price.innerText = pizzaPrice + "$";
    container.appendChild(price);

    return cardDiv;
};

function insertElementTo(element, elementToInsert) {
    element.appendChild(elementToInsert);
};

fetch("http://127.0.0.1:9001/api/pizza")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.pizzas.map((pizza, index) => {
            insertElementTo(root, createCard(pizza, pizza.name, pizza.price, index));
        });
})
// const fs = require("fs");

// const pizzas = fs.readFileSync("./backend/pizzas.json", "utf8");
// console.log(pizzas);

// console.log("HAllooo");


// root.insertAdjacentHTML("beforeend", "<button>");