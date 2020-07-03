const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the TODO List');
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});