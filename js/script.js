$(document).ready(function () {

  const MAX_INPUT_LENGTH = 40
  var lineNumber = 0;
  var lineValues = []; // Hold values for all lines
  var lineLock = []; // Hold value to determine if line is over 40 characters

  // Add new line
  function addNewLine() {
    lineNumber++;
    lineValues.push('');
    lineLock.push(false);
    $(".lines").append("<div class='line'>Line " + lineNumber + " <input class='line-input' type='text' maxlength='" + MAX_INPUT_LENGTH + "'/> <button class='removeLine'>X</button></div>");
  }

  // On button click, add new line
  $("#newLine").on("click", function () {
    addNewLine();
  });

  // Remove line
  $(document).on("click", ".removeLine", function () {
    var index = $(this).parent().index();
    lineValues.splice(index, 1);
    lineLock.splice(index, 1);
    $("#outputLines").val(lineValues.join("\n"));
    $(this).closest('.line').remove();
  });

  $(document).on("keyup", ".line-input", function (event) {
    var inputText = $(this).val();
    if ((inputText.length) < MAX_INPUT_LENGTH) {
      lineValues[$(this).parent().index()] = inputText;
      lineLock[$(this).parent().index()] = false;
      $("#outputLines").val(lineValues.join("\n")); // Display in textarea
    } else {
      if (lineLock[$(this).parent().index()] === false) {
        lineValues[$(this).parent().index()] = inputText;
        lineLock[$(this).parent().index()] = true;
        $("#outputLines").val(lineValues.join("\n"));
        addNewLine();
        $(this).parent().siblings(":last").find(".line-input").focus(); // Focus new line
      }
    }
  });

});  