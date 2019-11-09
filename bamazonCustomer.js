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
    readDB();
})

function readDB() {
    connection.query("SELECT * from products", function (err, response) {
        //console.log(response.length);
        console.log("ITEM_ID | PRODUCT_NAME | DEPARTMENT_NAME | PRICE | STOCK_QUANTITY");
        for (let i = 0; i < response.length; i++) {
            console.log(response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity);
        }
        //prompt user
        promptUser();
    });
}
function promptUser() {
    inquirer.prompt([{
        name: "itemid",
        type: "input",
        message: "Enter product id:"
    }, {
        name: "quantity",
        type: "input",
        message: "Enter quantity:"
    }]).then(function (answer) {
        //console.log(answer);
        processAnswer(answer);
    })
}
function processAnswer(answer) {
    //console.log(answer.itemid, answer.quantity);
    var query = "SELECT PRICE,STOCK_QUANTITY from products where ITEM_ID =" + answer.itemid;
    console.log(query);
    connection.query(query, function (err, response) {
        if (err) throw err;
        var response_json= JSON.parse(JSON.stringify(response));
        var db_stock_quantity = response_json[0]["STOCK_QUANTITY"];
        var db_price = parseFloat(response_json[0]["PRICE"]);
        var requestedQuantity = parseFloat(answer.quantity);
        if( requestedQuantity > db_stock_quantity)
        {
            console.log("\nInsufficient quantity!\n");
            console.log("\n");
            promptUser();    
        }
        else{
            console.log("\nUpdate records\n");
            var updateQuery = "UPDATE products set STOCK_QUANTITY="+(db_stock_quantity-requestedQuantity);
            connection.query(updateQuery,function(err,resp){
                if(err) throw err;
                console.log("Total product price is:",(db_stock_quantity-requestedQuantity)*db_price);
                console.log("\n");
                promptUser();        
            })
        }
    })
    //connection.end();
}
