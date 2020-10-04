var mongoose=require('mongoose')

var todoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:'Name cannot be blank'
    },
    completed: {
        type:Boolean,
        default:false
    },
    created_date:{
        type:Date,
        default:Date.now   
    }
})
//('todo) in model is name of the model we are exporting

var todo=mongoose.model('todo',todoSchema);
module.exports=todo;