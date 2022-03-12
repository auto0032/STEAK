const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Table = require("./models/Table");
const Food = require("./models/Food");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var currentTable = 1;
var nullFood = [{ 'id': 100, 'name': null, 'price': null }];
var tmpFood = [{ 'id': 101, 'name': 'smoke salmon', 'price': 120 }];
var tmpURL;

app.get("/", function(req, res) {
    // console.log(currentTable);
    const table = Table.getTableById(currentTable);
    console.log(table[0].foods);
    if (table[0].foods != null) {
        res.render("home", {
            table: currentTable,
            foods: table[0].foods
        });
    } else {
        res.render("home", {
            table: currentTable,
            foods: nullFood
        });
    }
})

app.get("/appetizer", function(req, res) {
    tmpURL = "/appetizer";
    res.render("appetizer-menu");
})

app.get("/maindish", function(req, res) {
    tmpURL = "/maindish";
    res.render("main-dish");
})

app.get("/dessert", function(req, res) {
    tmpURL = "/dessert";
    res.render("dessert-menu");
})

app.get("/drinks", function(req, res) {
    tmpURL = "/drinks";
    res.render("drinks-menu");
})

app.get("/login", function(req, res) {
    res.render("login");
})

app.get("/kitchen", function(req, res) {
    res.render("kitchen");
})

app.post("/", function(req, res) {
    currentTable = req.body.table;
    res.redirect("/");
})

app.post("/checkedout", function(req, res) {
    currentTable = 0;
    res.redirect("/");
})

app.post("/login", function(req, res) {
    res.redirect("/kitchen");
})

app.post("/addFood", function(req, res) {
    const foodID = req.body.id;
    //const table = Table.getTableById(currentTable);
    Table.addFoodToTable(foodID, currentTable);
    //console.log(table[0].foods);
    res.redirect(tmpURL);
})

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
});