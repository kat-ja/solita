const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let {names} = require('./names.json');

// List names and amounts, order by amount, most popular first
names.sort((a, b) => b.amount - a.amount);

// List names in alphabetical order
let namesAlpha = [];
for (let i = 0; i < names.length; i++) {
  namesAlpha.push(names[i].name);
}
namesAlpha.sort();

// Return the total amount of all the names

// Return the amount of the name given as a parameter
function getName(wantedName) {
    for (let i in names) {
      if (wantedName === names[i].name) return names[i].amount;
    }
}
let wantedName = '';
let amountWantedName = '';
 
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.post('/get-amount', (req, res) => {
  wantedName = req.body.name;
  amountWantedName = getName(wantedName);
  console.log(amountWantedName);
  res.redirect('/');
});

app.use('/', (req, res) => {
    res.render('names', {
      names: names,
      alpha: namesAlpha,
      length: names.length,
      wanted: wantedName,
      amount: amountWantedName
    });
})

app.listen(5000);