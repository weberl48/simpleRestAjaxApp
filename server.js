var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var people = [
{
    id: 1,
    name: 'bob'
},
{
    id: 2,
    name: 'mary'
}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/people', function(req, res) {
    res.send({ people: people });
});

app.post('/people', function(req, res) {
    var productName = req.body.name;
    currentId++;

    people.push({
        id: currentId,
        name: productName
    });

    res.send('Successfully created product!');
});

app.put('/people/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    people.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Succesfully updated product!');
});

app.delete('/people/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    people.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            people.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
