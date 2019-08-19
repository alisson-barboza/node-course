const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title === title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)    
    }else{
        console.log(chalk.red('No note was found!'))
    }
    
}

const listNotes = () => {
    console.log(chalk.blue('Your notes...'))
    loadNotes().forEach((note) => console.log(note.title))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToSave = notes.filter((note) => note.title != title)
    if(notes.length > notesToSave.length){
        saveNotes(notesToSave)
        console.log(chalk.green('Note removed!'))
    }else{
        console.log(chalk.red('No note found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){        
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    }else{
        console.log(chalk.red('Note tittle taken!'))
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('./notes.json')
        return JSON.parse(dataBuffer.toString())
    }catch(e){
        return []
    }
}

module.exports = {
    removeNote: removeNote,
    addNote: addNote,
    listNotes: listNotes,
    readNote: readNote
}


