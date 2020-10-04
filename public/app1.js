
$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"/api/todos"
    }).then(function(data){
      
        data.forEach(function(data1){
           var newitem=$(`<li class="task">${data1.name}<span>X</span></li>`);
           newitem.data('id',data1._id);
           if(data1.completed){
               newitem.addClass("done");
           }
      $('#items').append(newitem);
        })

    }).catch(function(err){
        console.log(err);
    })
  
$("#value").keypress(function(event){
    if(event.which==13){
      

            var productlist=$("#items")
            var itemsval=$("#value")
           $.ajax({
            method:"POST",
            url:'/api/todos/additem',
            data:{name:itemsval.val()}
            }).then(function(data1){
                var newitem=$(`<li>${data1.name}</li>`);
                if(data1.completed){
                    newitem.addClass("done");
                    
                }
                itemsval.val('');
           $('#items').append(newitem);
                window.alert("item added");
            })
            .catch(function(err){
                console.log(err);
            })
           
    }
})}
)
$('#items').on('click','span',function(){
var id1=$(this).parent().data('id');
$(this).parent().remove();
$.ajax({
    method:"DELETE",
    url:"/api/todos/"+id1,
    
}).then(function(){
    window.alert("Deleted");
})
})


// $("#btn").click(function(){

//     var productlist=$("#items")
//     var itemsval=$("#value")
//    $.ajax({
//     method:"POST",
//     url:'/api/todos/additem',
//     data:{name:itemsval.val()}
//     }).then(function(){
//         window.alert("item added");
//     })
//     .catch(function(err){
//         console.log(err);
//     })
//    }  )

