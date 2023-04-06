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

const root = document.querySelector("#root");
console.log(root);

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
};

function createInput(idName, placeholder) {
    const input = document.createElement("input");
    input.setAttribute("id", idName);
    input.classList.add("input-fields");
    input.setAttribute("placeholder", placeholder);

    return input;
}

function createTitle() {
    const h1 = document.createElement("h1");
    h1.classList = "title";
    h1.innerText = "Your Order";

    return h1;
};

function createBackgroundImage() {
    const backgroundImage = document.createElement("img");
    backgroundImage.setAttribute("src", "/frontend/images/background.jpeg");
    backgroundImage.setAttribute("id", "background-image");

    return backgroundImage;
};

function insertInputFieldsTo(element) {
    element.appendChild(createTitle());
    element.appendChild(createInput("name", "Name"));
    element.appendChild(createInput("email", "Email"));
    element.appendChild(createInput("city", "City"));
    element.appendChild(createInput("street", "Street"));
}

function createFrom() {
    const form = document.createElement("form");
    form.classList.add("formular");

    insertInputFieldsTo(form);

    return form;
};

function insertElementTo(element, elementToInsert) {
    element.appendChild(elementToInsert);
};

insertElementTo(root, createHeader());
insertElementTo(root, createFrom())
insertElementTo(root, createBackgroundImage());


fetch("http://127.0.0.1:9001/api/order/list")
    .then(data => data.json())
    .then(data => {
        const orderedPizzas = JSON.parse(data);

        console.log(orderedPizzas);
    })
