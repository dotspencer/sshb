var fs = require('fs');
var child = require('child_process');

/*-=-=-=-=-
  Shows the list of bookmarks
-=-=-=-=-*/
function showList(list){
  var longest = getLongestKeyLength(list);

  console.log();
  for (var key in list) {
    if (list.hasOwnProperty(key)) {
      var pad = createSpace(longest - key.length);
      console.log(`${key + pad} -> "${list[key]}"`);
    }
  }
  console.log();
}

/*-=-=-=-=-
  Creates a whitespace-filled string of the specified length
-=-=-=-=-*/
function createSpace(length){
  var space = "";
  for (var i = 0; i < length; i++) {
    space += " ";
  }
  return space;
}

/*-=-=-=-=-
  Gets the length of the longest alias string
-=-=-=-=-*/
function getLongestKeyLength(list){
  var longest = 0;
  for (var key in list) {
    if(list.hasOwnProperty(key) && key.length > longest){
      longest = key.length;
    }
  }
  return longest;
}

/*-=-=-=-=-
  Adds a new bookmark to the list
-=-=-=-=-*/
function addNew(args, list){
  var key = args[1];
  var bookmark = args[2];
  list[key] = bookmark;
  fs.writeFile(`${__dirname}/list.json`, JSON.stringify(list), function(err){
    if(err) throw err;
    console.log("Bookmarks list updated.");
  });
}

/*-=-=-=-=-
  Removes a bookmark from the list
-=-=-=-=-*/
function remove(args, list){
  var key = args[1];
  var existed = list.hasOwnProperty(key);
  delete list[key];
  fs.writeFile(`${__dirname}/list.json`, JSON.stringify(list), function(err){
    if(err) throw err;
    var msg = existed ? "Bookmark removed." : "Bookmark not found.";
    console.log(msg);
  });
}

/*-=-=-=-=-
  Copies the command to be pasted
-=-=-=-=-*/
function copyCommand(args, list){
  var key = args[0];
  var exists = list.hasOwnProperty(key);
  var msg = "Bookmark not found.";
  if(exists){
    child.exec(`echo "${list[key]}"  | pbcopy`);
    msg = "--- Paste and you're off! ---";
  }
  console.log(msg);
}

/*-=-=-=-=-
  Shows error messages
-=-=-=-=-*/
function showError(){
  console.log("\nTry running either of the following:");
  console.log("• sshb list");
  console.log("• sshb add '<alias>' 'ssh ___@coolsite.com'");
  console.log("• sshb remove '<alias>'\n");
}

module.exports = {
  showList: showList,
  addNew: addNew,
  remove: remove,
  copyCommand: copyCommand,
  showError: showError
}
