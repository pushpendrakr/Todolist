
$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"/api/todos"
    }).then(function(data){
      
        data.forEach(function(data1){
           var newitem=$(`<li class="task">${data1.name}<span class="cross">X</span></li>`);
           newitem.data('id',data1._id);
           newitem.data('completed',data1.completed);
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
                var newitem=$(`<li class="task">${data1.name} <span class="cross">X</span></li>`);
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
})
$('#items').on('click','li',function(){
    var id1=$(this).data('id');
    var updated=$(this).data('completed');
    
       $.ajax({
        method:"PUT",
        url:"/api/todos/"+id1,
        data:{completed:!updated}
    }).then(function(data){
       $(this).toggleClass("done");
       $(this).data('completed',!updated);
       alert("updated");
    })
    .catch(function(err){
        console.log(err);
    })
   
   }
   )
})
//when the page loads span are not present, we are adding them afterwards using jquery therefore we cant simply do $('span').on('click',function(){console.log("hello")})
//that will not work so we use the ul already present and using that add a span parameter in the on function
$('#items').on('click','span',function(e){
e.stopPropagation();
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

