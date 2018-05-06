$(function(){
  $(".change-devour").on('click', function(event){
    var id=$(this).data('id');
    var newDevour=$(this).data("newdevour");

    var newlyDevoured={
      devoured:newDevour
    };

    $.ajax("/api/burgers/" +id, {
      type:"PUT",
      data:newlyDevoured
    }).then(function(){
      console.log("changed devoured to", newDevour);

      location.reload();
    });
  });

  $(".create-form").on('submit', function(event){
    event.preventDefault();

    var newBurger={
      burger_name:$('.burger').val().trim(),
      devoured:1
    };

    $.ajax("/api/burgers", {
      type:'POST',
      data:newBurger
    }).then(function(){
      console.log("new burger added");

      location.reload();
    });
  });
  // 
  // $(".delete-burger").on('click', function(event){
  //   var id=$(this).data("id");
  //
  //   $.ajax('/api/burgers/' + id, {
  //     type:"DELETE"
  //   }).then(function(){
  //     console.log("deleted burger", id);
  //
  //     location.reload();
  //   });
  // });

});
