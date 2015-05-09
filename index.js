# Description
#   Eslint plugin for hubot. Point it at a file and it will lint it for you.
#
# Dependencies:
#   "eslint": "^0.21.0"
#
# Commands:
#   hubot lint <filename> - Hubot will fetch the file and lint it, then return a status.
#
# Author:
#   Greg Cochard <greg@gregcochard.com>

module.exports = function(robot){
  robot.respond(/lint ([\w.]+)/i,function(msg){
    var filename = msg.match[1];
    msg.send('linting file '+filename);
  });
}
