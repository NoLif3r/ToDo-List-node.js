const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// project modules
const date = require(__dirname + '/date.js');

app.use(bodyParser.urlencoded({extended: true})); // activate body parser for requests
app.use(express.static('public')); // use public folder to deliver some files to client
app.set('view engine', 'ejs'); // use ejs templates from views folder


// business logic variables:
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.get('/', (req, res) => {
    let today = date.getDate();

    res.render('list', {kindOfDay: today, todoItems: items});
});

app.get('/work', (req, res) => {
    res.render('list', {kindOfDay: 'Work', todoItems: workItems});
})

app.post('/', (req, res) => {
    let item = req.body.newTodo;
    let listName = req.body.button;
    console.log(req.body)
    if (listName === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.listen(3000, () => {
    console.log('Server is started on port 3000');
})
