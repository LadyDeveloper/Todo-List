const express = require('express');
const bodyParser = require('body-parser');
const date =  require(__dirname + "/date.js");

const app = express();

const items = ["Create Exercise routine", "Create Coding routine", "List of meal prep"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    const day = date.getDate();
    res.render('list', {kindOfDay: day, itemsList: items});
});

app.post("/", (req, res) => {
    const item = req.body.itemTodo;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});