$(document).ready(function () {

  var lineNumber = 0;
  var lineValues = [];

  // Add new line
  $("#newLine").on("click", function () {
    lineNumber++;
    lineValues.push('');
    $(".lines").append("<div class='line'>Line " + lineNumber + " <input class='line-input' type='text'/> <button class='removeLine'>X</button></div>");
  });

  // Remove line
  $(document).on("click", ".removeLine", function () {
    var index = $(this).parent().index();
    lineValues.splice(index, 1);
    $("#outputLines").val(lineValues.join("\n"));
    $(this).closest('.line').remove();
  });

  // Display in textarea
  $(document).on("keyup", ".line-input", function () {
    lineValues[$(this).parent().index()] = $(this).val();
    $("#outputLines").val(lineValues.join("\n"));
  });

});  