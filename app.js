var express=require('express');
var app=express();
var bodyparser=require('body-parser')
var todosroutes=require('./routes/todos.js');
//these two lines allow us to acces to body of post request
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

//telling express where static files are present is present
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.sendFile('index.html');
})
app.use('/api/todos',todosroutes);
app.post('/api/todos',todosroutes);
app.put('/api/todos',todosroutes);
app.post('/api/todos/additem',todosroutes);
app.listen(8080||process.env.PORT,function(){
    console.log("App running");
})