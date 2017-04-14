# sshb
Simple SSH Bookmark Tool

### Commands

**`sshb list`** - shows all bookmarked ssh connections

    $ sshb list
    
    taken -> "ssh spencer@alreadytaken.com"
    georgia -> "ssh user80@georgia.utah.edu"
    lab -> "ssh student@lab.cuu.edu"

<br>

**`ssh add [ALIAS] [COMMAND]`** - adds (or modifies) a ssh bookmark

    $ sshb add 'lab' 'ssh user@lab.eng.utah.edu'

<br>

**`ssh remove [ALIAS]`** - removes the bookmarked ssh command

    $ sshb remove 'lab'
