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
        console.table(response);
        //prompt user
        promptUser();
    });
}

function promptUser() {
    inquirer.prompt([{
        name: "itemid",
        type: "input",
        message: "Enter id of the product you wish to buy:"
    }, {
        name: "quantity",
        type: "number",
        message: "Enter required quantity:"
    }]).then(function (answer) {
        //console.log(answer);
        processAnswer(answer);
    })
}
function processAnswer(answer) {
    //console.log(answer.itemid, answer.quantity);
    var query = "SELECT PRICE,STOCK_QUANTITY,PRODUCT_SALES from products where ITEM_ID =" + answer.itemid;
    //console.log(query);
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
            let current_sale_price = (db_stock_quantity-requestedQuantity)*db_price;
            let total_sales= parseFloat(response_json[0]["PRODUCT_SALES"]) + current_sale_price; 
            //console.log(total_sales,response_json[0]["PRODUCT_SALES"],current_sale_price);
            var updateQuery = "UPDATE products set STOCK_QUANTITY="+(db_stock_quantity-requestedQuantity)+",PRODUCT_SALES="+total_sales.toFixed(2)+" where item_id="+answer.itemid;
            //console.log(updateQuery);
            connection.query(updateQuery,function(err,resp){
                if(err) throw err;
                console.log("\nTotal product price is:",current_sale_price+"$.");
                console.log("\n");
                readDB();
            })
        }
    })
}
