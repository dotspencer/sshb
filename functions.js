function showList(list){
  console.log();
  for (var key in list) {
    if (list.hasOwnProperty(key)) {
      console.log(`${key} -> "${list[key]}"`);
    }
  }
  console.log();
}

function addNew(args, list){
  var key = args[1];
  var bookmark = args[2];
  list[key] = bookmark;
  fs.writeFile(`${__dirname}/list.json`, JSON.stringify(list), function(err){
    if(err) throw err;
    console.log("Bookmarks list updated.");
  });
}

function copyCommand(args){
  var key = args[0];
  if(list[key] != null){
    child.exec(`echo "${list[key]}"  | pbcopy`);
    console.log("--- Paste and you're off! ---");
  } else {
    console.log("Bookmark not found.");
  }
}

function showError(){
  console.log("\nTry running either of the following:");
  console.log("• sshb list");
  console.log("• sshb add '<shortname>' 'ssh ___@coolsite.com'\n");
}

module.exports = {
  showList: showList,
  addNew: addNew,
  copyCommand: copyCommand,
  showError: showError
}
