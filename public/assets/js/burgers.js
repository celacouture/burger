$(function(){
  $(".change-devour").on('click', function(event){
    var id=$(event.currentTarget).data('id');
    var newDevour=$(event.currentTarget).data("newdevour");

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
    })
  });

});
