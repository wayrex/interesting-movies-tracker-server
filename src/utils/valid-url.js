/**
 * Validates if the string is a valid URL.
 * @param {String} urlToBeValidated The a string to validate if it is a valid URL.
 * @returns {Boolean} True if the given string is a valid URL.
 */
function validUrl(urlToBeValidated = '') {
  var pattern = new RegExp('^(https?:\/\/)?'+
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+
    '((\d{1,3}\.){3}\d{1,3}))'+
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+
    '(\?[;&a-z\d%_.~+=-]*)?'+
    '(\#[-a-z\d_]*)?$','i');
  if(!pattern.test(urlToBeValidated)) {
    return false;
  } else {
    return true;
  }
};

return validUrl;