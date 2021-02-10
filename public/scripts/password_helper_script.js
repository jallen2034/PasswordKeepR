


$(document).ready(function() {

  // function update counter for password length range input
  // https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
  $('#passwordLength').on('input', function() {
    $('#slider_value').html(this.value);
  });
  $('#pwordSubmission').on('click', function() {
    const url = $('#urlInput').val();
    const password = 'password';
    const passwordLength = $('#passwordLength').val();
    const upperCaseVal = document.querySelector('#upperCaseCheck').checked;
    const lowerCaseVal = document.querySelector('#lowerCaseCheck').checked;
    const numberCheckVal = document.querySelector('#numbersCheck').checked;
    const symbolVal = document.querySelector('#symbolsCheck').checked;
    console.log("numberCheckVal: ", numberCheckVal);
    console.log("lowercaseVal: ", lowerCaseVal);
    console.log("symbolVal: ", symbolVal);

    $.ajax({ method: 'POST', url: '/password_gen', data: { url: url, length: passwordLength, uppercase: upperCaseVal, lowercase: lowerCaseVal, numbers: numberCheckVal, symbols: symbolVal  } })
    .then(function (response) {
      console.log("response from the server is: ", response);
    });
  });
});

