var express = require('express'),
    bodyParser = require('body-parser'),
    lowdb = require('lowdb');

var db = lowdb('./data/data.json');
db._.mixin(require('underscore-db'));

db._.createId = function(collectionName, doc) {
    let len = db("clients").__wrapped__.length;
    return len + 1;
};

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));

require('./utils/authorize-user')(app, db);

//User routes
var usersController = require('./controllers/users-controller')(db);
var clientsController = require('./controllers/client-controller')(db);
app.get('/api/users', usersController.get);
app.get('/api/clients', clientsController.get);
app.post('/api/clients', clientsController.post);
app.post('/api/profile', clientsController.postDate);
app.post('/api/users', usersController.post);
app.put('/api/auth', usersController.put);




var port = 3000;
app.listen(port, function() {
    console.log('Server is running at http://localhost:' + port);
});