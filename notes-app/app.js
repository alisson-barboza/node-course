const notes = require('./notes.js')
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
        },
        body:{
            describre: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describre: 'Remove a note',
    builder: {
        title: {
            describre: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }

})

//Create read command
yargs.command({
    command: 'read',
    describre: 'Read a note',
    builder: {
        title: {
            describre:'Note title'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describre: 'List all notes',
    handler(){
        notes.listNotes()
    }
})
yargs.parse()