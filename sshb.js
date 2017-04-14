#!/usr/bin/env node
var f = require(`${__dirname}/functions.js`);
var list = require(`${__dirname}/list.json`);
var args = process.argv.splice(2);

// List all bookmarks
if(args.length == 1 && args[0] == 'list'){
  return f.showList(list);
}

// Add new bookmark
if(args.length == 3 && args[0] == 'add' && args[1].length > 0 && args[2].length > 0 ){
  return f.addNew(args, list);
}

// Remove bookmark
if(args.length == 2 && args[0] == 'remove' && args[1].length > 0){
  return f.remove(args, list);
}

// Copies command to paste and run
if(args.length == 1){
  return f.copyCommand(args, list);
}

// Invalid command
f.showError();

// sudo cp -r sshb/ /usr/local/dotspencer/sshb/
