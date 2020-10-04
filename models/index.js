var mongoose=require('mongoose')
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise=Promise;
module.exports.todo=require('./todo')
