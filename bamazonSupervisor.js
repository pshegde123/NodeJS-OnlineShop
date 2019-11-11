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
    promptUser();
})

function show_sales() {
    var aggregate_query = "select d.department_id,d.department_name,sum(d.over_head_costs) as total_over_head_cost,sum(p.product_sales) as total_sales,sum(p.product_sales) - sum(d.over_head_costs) as total_profit" +
        " from products as p, departments as d " +
        " where d.department_name = p.department_name " +
        " group by d.department_id; ";
    //console.log(aggregate_query);
    connection.query(aggregate_query, function (err, resp) {
        if (err) throw err;
        console.table(resp);
        promptUser();
    });
    //connection.end();
}
function add_new_department() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter department name:"
        },
        {
            name: "cost",
            type: "number",
            message: "Enter over head cost:"
        }]
    ).then(function (answer) {
        var insert_query = "insert into departments(department_name,over_head_costs) values('" + answer.name + "'," + answer.cost + ");"
        //console.log(insert_query);
        connection.query(insert_query,function(err,resp){
            if (err) throw err;
            //Show list of departments
            connection.query("select * from departments",function(err,resp){
                if (err) throw err;
                console.table(resp);
                promptUser();
            });
        });
    });
}
function promptUser() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Select your option:",
        choices: ["View Product Sales by Department",
            "Create new department",
            "Exit"
        ]
    }).then(function (answer) {
        //console.log(answer);
        switch (answer.action) {
            case "View Product Sales by Department":
                show_sales();
                break;
            case "Create new department":
                add_new_department();
                break;
            case "Exit":
                connection.end();
            break;
        }

    })
}
