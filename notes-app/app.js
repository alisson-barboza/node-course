const chalk = require('chalk')
const getNotes = require('./notes.js')
const yargs = require('yargs')

// Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    describre: 'Add a new note',
    builder: {
        title: {
            describre: 'Note tittle',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Tittle: ' + argv.title)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describre: 'Remove a note',
    handler: function(){
        console.log('Removing the note')
    }

})

//Create read command
yargs.command({
    command: 'read',
    describre: 'Read a note',
    handler: function(){
        console.log('Reading a note')
    }
})

//Create list command
yargs.command({
    command: 'list',
    describre: 'List all notes',
    handler: function(){
        console.log('Listing all notes')
    }
})
yargs.parse()
//console.log(yargs.argv)