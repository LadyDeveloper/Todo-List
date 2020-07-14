const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemsSchema =  require('./item').schema;

const listSchema = new Schema({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model('List', listSchema);

module.exports = List;