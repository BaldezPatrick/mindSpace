const Handlebars = require("handlebars");

Handlebars.registerHelper("split", function (string, separator) {
  return string.split(separator);
});

module.exports = Handlebars;
