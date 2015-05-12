// Description
//   Eslint plugin for hubot. Point it at a file and it will lint it for you.
//
// Dependencies:
//   "eslint": "^0.21.0"
//   "got": "^3.2.0"
//
// Commands:
//   hubot lint <filename> - Hubot will fetch the file and lint it, then return a status.
//
// Author:
//   Greg Cochard <greg@gregcochard.com>

var url = require('url');
var got = require('got');
var defaultConfig = 'https://github.com/eslint/eslint/blob/master/conf/eslint.json';
var config, formatter, cli;
got(defaultConfig,function(conf_err,conf_data,conf_res){
  conf_data = JSON.parse(conf_data);
  conf_data.env.node = true;
  config = conf_data;
  var CLIEngine = require('eslint').CLIEngine;
  cli = new CLIEngine(conf_data);
  formatter = cli.getFormatter('compact');
});

module.exports = function(robot){
  robot.respond(/lint ([\w.]+)/i,function(msg){
    var filename = msg.match[1];
    var uri = url.parse(filename);
    if(!config){
      return msg.reply('error getting eslint config...restart me and try again later');
    }
    msg.send('linting file '+filename+'... please stand by');
    return got(uri,function(err,data,res){
      if(err){
        return msg.reply('error fetching file, ',err.message);
      }
      var report = cli.executeOnText(data);
      return msg.send(formatter(report.results));
    });
  });
};
