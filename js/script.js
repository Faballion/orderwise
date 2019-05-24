$(document).ready(function () {

  const MAX_INPUT_LENGTH = 40
  const MAX_TEXTAREA_LENGTH = 1000
  var lineNumber = 0;
  var lineValues = []; // Hold values for all lines
  var lineLock = []; // Hold boolean to determine if line is over 40 characters
  var outputLinesLength = 0;

  // Add new line
  function addNewLine() {
    lineNumber++;
    lineValues.push('');
    lineLock.push(false);
    $(".lines").append("<div class='line'><label>Line " + lineNumber + " </label><input class='line-input' type='text' maxlength='" + MAX_INPUT_LENGTH + "'/> <button type='button' class='removeLine btn btn-danger btn-sm'>X</button></div>");
  }

  // On button click, add new line
  $("#newLine").on("click", function () {
    addNewLine();
  });

  // Remove line
  $(document).on("click", ".removeLine", function () {
    var index = $(this).parent().index();
    if ($(this).siblings('.line-input').val().length > 0) {
      var res = confirm("Are you sure you want to remove this line?");
      if (res) {
        lineValues.splice(index, 1);
        lineLock.splice(index, 1);
        $("#outputLines").val(lineValues.join("\n")).change();
        $(this).closest('.line').remove();
      }
    } else { // If empty line
      lineValues.splice(index, 1);
      lineLock.splice(index, 1);
      $("#outputLines").val(lineValues.join("\n")).change();
      $(this).closest('.line').remove();
    }
  });

  // Output lines in textarea
  $(document).on("input", ".line-input", function (event) {
    var inputText = $(this).val();
    if ((inputText.length < MAX_INPUT_LENGTH) && (outputLinesLength < MAX_TEXTAREA_LENGTH)) {
      lineValues[$(this).parent().index()] = inputText;
      lineLock[$(this).parent().index()] = false;
      $("#outputLines").val(lineValues.join("\n")).change();
    } else {
      if ((lineLock[$(this).parent().index()] === false) && (outputLinesLength < MAX_TEXTAREA_LENGTH)) {
        lineValues[$(this).parent().index()] = inputText;
        lineLock[$(this).parent().index()] = true;
        $("#outputLines").val(lineValues.join("\n")).change();
        addNewLine();
        $(this).parent().siblings(":last").find(".line-input").focus(); // Focus new line
      } else {
        $("#outputLines").val(lineValues.join("\n")).change();
      }
    }
  });

  $(document).on("change", "#outputLines", function () {
    //Resize textarea font size
    if ($(this).get(0).scrollHeight > $(this).height()) {
      $(this).css('font-size', '-=1');
    }
    console.log('event fired: ' + $(this).val().length);

    // Display length of textarea
    outputLinesLength = $(this).val().length;
    if (outputLinesLength > MAX_TEXTAREA_LENGTH) {
      outputLinesLength = MAX_TEXTAREA_LENGTH;
    }
    $('#outputSubText').text("(" + outputLinesLength + "/" + MAX_TEXTAREA_LENGTH + ")");
  });

});  