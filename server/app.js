const express = require('express');
const morgan = require('morgan');
var port = process.env.PORT || 8484;
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// add your code here
var json = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', function(req, res) {
    res.set('Content-Type', 'application/json');
  res.json({'status': 'ok'});
});

app.get('/api/TodoItems', function(req, res) {
  res.status(200).send(json);
});

app.get('/api/TodoItems/:todoItemId', function(req, res) {
  
    json.forEach(function(items){
      if (req.params.todoItemId == items.todoItemId){
         res.status(200).send(items);
      }
  });       
   
});

app.post('/api/TodoItems/', function(req, res) {
   
    var todoItemId = req.param('todoItemId');
    var name = req.param('name');
    var priority = req.param('priority');
    var completed = req.param('completed');
    obj={'todoItemId' : parseInt(todoItemId), 'name': name, 'priority':parseInt(priority), 'completed': Boolean(completed)};
    console.log(todoItemId)
    var valueadded = false;
    for(i=0; i<json.length;i++){
        if (parseInt(json[i].todoItemId) == parseInt(todoItemId)){
           json[i].todoItemId = todoItemId;
           json[i].name = name;
           json[i].priority = priority;
           json[i].completed = completed;
           res.status(201).send(json[i]);
           valueadded = true;
           break;
    }
    }   
      if (valueadded == false){
        json.push(obj);
        n=json.length
        res.status(201).send(json[n-1]);
        
    }
    
 });

app.delete('/api/TodoItems/:todoItemsId', function(req, res){
var todoItemsId = req.param('todoItemsId');

  for(i=0; i<json.length;i++) {      
    if (parseInt(json[i].todoItemId) == parseInt(todoItemsId)){
        console.log(json.length);
     dele_item = {'todoItemId' : parseInt(json[i].todoItemId), 'name': json[i].name, 'priority':parseInt(json[i].priority), 'completed': Boolean(json[i].completed)};
         
          json.splice(i,1);
          res.status(200).send(dele_item); 
          break;
           
  } 
  }  
       
    res.statusCode = 200;
   
});

if(!module.parent){ 
    app.listen(port); 
}

module.exports = app;
