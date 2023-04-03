const http = require('http');
const fs = require('fs');

const ip = "127.0.0.1";
const port = 9000;
const server = http.createServer((request, response) => {

    //request parameter contains the incoming (request) data from the client side to the server side as an object 
    // console.log(request);
    // console.log(request.method);
    console.log(request.url);

    
    //response parameter contains the outgoing (response) data from the server side to the client side as an object 
    // console.log(response);
    
    
    //Write your code here
    //you can read the file with the help of the fs package's readFileSync method and parse the JSON with JSON.parse method
    const data = fs.readFileSync("./src/pizzas.json", {encoding: "utf8", flag: "r"})  
    const pizzas = JSON.parse(data);

    const html = fs.readFileSync("./index.html", "utf8");

    if(request.url === "/api/allergen") {
		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(html);
		response.end();
	
	}

    console.log(pizzas);
    //Don't forget to close your response
    response.end();
});

server.listen(port, ip, () => {
    const addr = server.address();
    console.log(`http://${addr.address}:${addr.port}/api/allergen`);
});

console.log("Hallo1");