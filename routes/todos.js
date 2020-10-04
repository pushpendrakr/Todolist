var express=require('express');
var router=express. Router();
var db=require('../models')

router.get('/',function(req,res){
 db.todo.find()
 .then(function(todos){
     res.json(todos);
 })
 .catch(function(err){
     res.send(err);
 })
})
//we dont have access to post body directly, we can do it using body-parser(a package)(it takes the body as string as input and return body as object)
router.post('/',function(req,res){
 db.todo.create(req.body)
 .then(function(newtodo){
  res.json(newtodo);
 })
})

//for extracting the body of the request we got(like here we need the /:(todoid)),what we can do is req.params.todoid,
// this will return whatever was there in place of todoid
router.get('/:todoid',function(req,res){
    db.todo.findById(req.params.todoid)
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        res.send(err);
    })
})

//Update route

//we find the object we need to update using findOneAndUpdate,then update it using whatever is there in the body using req.body

//here it updates the data but the res.send(data) in then funtion will return the previous values only
//for getting the update value from the res.send(data) we have to add {new:true} in the findOneAndUpdate funtion

router.put('/:todoid',function(req,res){
    db.todo.findOneAndUpdate({_id:req.params.todoid},req.body,{new:true})
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        res.send(err);
    })
})

//Delete route
router.delete('/:todoid',function(req,res){
     db.todo.remove({_id:req.params.todoid})
     .then(function(){
         res.send("Deleted");
     })
     .catch(function(err){
         res.send(err);
     })
    })

router.post('/additem',function(req,res){
    db.todo.create(req.body)
    .then(function(data){
        res.send(data);

    })
    .catch(function(err){
        console.log(err);
    })
})


module.exports=router;