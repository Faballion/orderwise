$(document).ready(function () {

  var lineCounter = 0;

  // Add new line
  $("#newLine").on("click", function () {
    lineCounter++;
    $(".lines").append("<div class='line'>Line " + lineCounter + " <input type='text'/> <button class='removeLine'>X</button></div>");
  });

  // Remove line
  $(document).on("click", ".removeLine", function () {
    lineCounter--;
    $(this).closest('.line').remove();
  });

});  