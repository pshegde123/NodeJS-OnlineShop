var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "192.168.99.100",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showManagerOptions();
})

function showManagerOptions() {
    inquirer.prompt([{
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product",
            "exit"
        ]
    }]).then(function (answer) {
        switch (answer.action) {
            case "View products for sale":
                console.log("option 1");
            break;
            case "View low inventory":
                    console.log("option 2");
            break;
            case "Add to inventory":
                    console.log("option 3");
            break;
            case "Add new product":
                    console.log("option 4");
            break;
            case "exit":
                   connection.end();
            break;
        }
    });
}