var path = require('path'),
    fs   = require('fs'),
    ejs  = require('ejs');

var baseDir = path.resolve(__dirname, '../../app/admin/emails');

exports.compile = function (name) {
  var htmlTemplate = compileTemplate(name, 'html'),
      textTemplate = compileTemplate(name, 'txt');


  return function (model) {
    try {
      return {
        html: htmlTemplate(model),
        text: textTemplate(model)
      };
    } catch(e) {
      console.error(e);

      return null;
    }
  };
};

function compileTemplate(name, type) {
  var filename = path.resolve(baseDir, type, name + '.' + type),
      content  = fs.readFileSync(filename, {encoding: 'utf8'});

  return ejs.compile(content, {filename: filename});
}
