const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Item = require('./models/item');
const List = require('./models/list');
const _ = require('lodash');
require('dotenv').config({path: __dirname + '/.env'});

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false });

const defaultItems = [
    {  name: "Coding Project" },
    { name: "Morning Routine" },
    { name: "Coding Schedule" }
];


app.get('/', (req, res) => {

    Item.find( {}, (err, items ) => {
        if( items.length === 0){
            Item.create(defaultItems , (err) => {
                    if(err)  {
                        console.log(err);
                    } else {
                        console.log('Item created successfully!');
                    }
                }
            );
            res.redirect('/');
        } else {
           res.render('list', {kindOfDay: "Today", itemsList: items});
        }
    
    });
});

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    if( listName === "Today"){
        item.save()
        console.log('It is Today');
        res.redirect('/');
    } else {
        List.findOne( {name: listName }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            console.log(`List ${listName} has added item ${item} to its array ${foundList}`);
            res.redirect('/' + listName);
        });
    }    
});

app.post('/delete', (req, res) => {
    const checkedId = req.body.checkbox;
    const listName = req.body.listName;

    if( listName === 'Today'){
        Item.findByIdAndRemove(checkedId, (err, item) => {
            if(err){
                console.log(err);
            } else {
                console.log(`Item ${item.name} removed!`)
                res.redirect('/');
            }
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedId}}}, ( err, foundList) => {
            if(!err){
                res.redirect('/' + listName);
            }
        });
    }
});

app.get('/:category', (req, res) => {
    const category = _.capitalize(req.params.category);

    List.findOne( {name: category}, (err, items ) => {
        if(!err){
            if(!items){
                console.log('Category does not exist!');
                List.create({
                    name: category,
                    items: defaultItems
                } , (err) => {
                        if(err)  {
                            console.log(err);
                        } else {
                            console.log('Item created successfully!');
                            res.redirect(`/${category}`);
                        }
                    }
                );
            } else {
                res.render('list', {kindOfDay: items.name, itemsList: items.items});
            }
        }
    });  
   
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
    console.log('Server has started!');
});