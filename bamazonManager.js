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

function view_products() {
    var select_query = "SELECT ITEM_ID,PRODUCT_NAME,PRICE,STOCK_QUANTITY from products;";
    connection.query(select_query, function (err, response) {
        console.log("ITEM_ID | PRODUCT_NAME | PRICE | STOCK_QUANTITY");
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]["ITEM_ID"], response[i]["PRODUCT_NAME"], response[i]["PRICE"], response[i]["STOCK_QUANTITY"]);
        }
    });
}
function low_inventory() {
    var select_query = "SELECT ITEM_ID,PRODUCT_NAME,PRICE,STOCK_QUANTITY from products where STOCK_QUANTITY<=5;";
    connection.query(select_query, function (err, response) {
        console.log("ITEM_ID | PRODUCT_NAME | PRICE | STOCK_QUANTITY");
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]["ITEM_ID"], response[i]["PRODUCT_NAME"], response[i]["PRICE"], response[i]["STOCK_QUANTITY"]);
        }
    });
}
function add_inventory() {
    var product_count = 0;
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter item ID of product you wish to restock:"
    },
    {
        name: "quantity",
        type: "number",
        message: "Enter quantity:"
    }]).then(function (answer) {
        //Get current stock quantity 
        var select_query = "SELECT STOCK_QUANTITY from products where ITEM_ID=" + answer.id;
        connection.query(select_query, function (err, response) {
            if (err) throw err;
            product_count = response[0]["STOCK_QUANTITY"];
            //Update the database with restock_quantity value
            var update_count = parseFloat(answer.quantity) + parseFloat(product_count);
            //console.log(answer.quantity,product_count,update_count);
            var query = "UPDATE products set STOCK_QUANTITY=" + update_count + " where ITEM_ID=" + answer.id;
            //console.log(query);
            connection.query(query, function (err, response) {
                if (err) throw err;
                view_products();
            });
        });
    });
}
function add_product() {
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"Enter name of product to add to inventory:"
        },
        {   
            name:"department",
            type:"input",
            message:"Enter department name:"
        },
        {
            name:"price",
            type:"number",
            message:"Enter price"
        },
        {
            name:"quantity",
            type:"number",
            message:"Enter quantity to add"
        }
    ]).then(function(answer){
        console.log(typeof(answer.name));
        let insert_query = "insert into products(PRODUCT_NAME,DEPARTMENT_NAME,PRICE,STOCK_QUANTITY) values('"+answer.name+"','"+answer.department+"',"+answer.price+","+answer.quantity+");";
        console.log(insert_query);
        connection.query(insert_query,function(err,resp){
            if (err) throw err;
            console.log("New product added successfully!");
            view_products();
        });
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
                add_inventory();
                break;
            case "Add new product":
                add_product();
                break;
            case "exit":
                connection.end();
                break;
        }
    });
}