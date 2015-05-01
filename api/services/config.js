var conf = sails.config.app
    User = require('../models/User');

var stringifyRegex = function(regex) {
  return String(regex).replace(/^\/|\/$/g, '');
};

conf.regex = {
  username: stringifyRegex(User.usernameRegex)
};

module.exports = {
  all:         function() { return conf; },
  appname:     function() { return conf.appname; },
  uiversion:   function() { return conf.uiversion; },
  signin:      function() { return conf.signin; },
  regex:       function() { return conf.regex; },
};

