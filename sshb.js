#!/usr/bin/env node
var fs = require('fs');
var child = require('child_process');
var args = process.argv.splice(2);

// List all bookmarks
if(args.length == 1 && args[0] == 'list'){
  var list = require('./list.json');

  console.log();
  for (var key in list) {
    if (list.hasOwnProperty(key)) {
      console.log(`${key} -> "${list[key]}"`);
    }
  }
  console.log();
  return;
}

// Add new bookmark
if(args.length == 3 && args[0] == 'add' && args[1].length > 0 && args[2].length > 0 ){
  var list = require('./list.json');
  var key = args[1];
  var bookmark = args[2];
  list[key] = bookmark;
  fs.writeFile('list.json', JSON.stringify(list), function(err){
    if(err) throw err;
    console.log("Bookmarks list updated.");
  });
  return;
}

// Copies command to paste and run
if(args.length == 1){
  var list = require('./list.json');
  var key = args[0];
  if(list[key] != null){
    child.exec(`echo "${list[key]}"  | pbcopy`);
    console.log("--- Paste and you're off! ---");
  } else {
    console.log("Bookmark not found.");
  }
  return;
}

// Invalid command
console.log();
console.log("Try running either of the following:");
console.log("• sshb list");
console.log("• sshb add '<shortname>' 'ssh ___@coolsite.com'");
console.log();
