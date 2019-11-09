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

function view_products(){
    var select_query="SELECT ITEM_ID,PRODUCT_NAME,PRICE,STOCK_QUANTITY from products;";
    connection.query(select_query,function(err,response){
        console.log("ITEM_ID | PRODUCT_NAME | PRICE | STOCK_QUANTITY");
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]["ITEM_ID"], response[i]["PRODUCT_NAME"], response[i]["PRICE"], response[i]["STOCK_QUANTITY"]);
        }
    });
}
function low_inventory(){
    var select_query="SELECT ITEM_ID,PRODUCT_NAME,PRICE,STOCK_QUANTITY from products where STOCK_QUANTITY<=5;";
    connection.query(select_query,function(err,response){
        console.log("ITEM_ID | PRODUCT_NAME | PRICE | STOCK_QUANTITY");
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]["ITEM_ID"], response[i]["PRODUCT_NAME"], response[i]["PRICE"], response[i]["STOCK_QUANTITY"]);
        }
    });
}

function showManagerOptions() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product",
            "exit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View products for sale":
                view_products();
            break;
            case "View low inventory":
                    low_inventory();
            break;
            case "Add to inventory":
                    console.log("add to inventory");
            break;
            case "Add new product":
                    console.log("add new product");
            break;
            case "exit":
                   connection.end();
            break;
        }
    });
}