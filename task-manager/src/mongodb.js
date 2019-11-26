//CRUD
const mongodb = require('mongodb')
const MongoCliente = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:17017'
const databaseName = 'task-manager'

MongoCliente.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');        
    }
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name: 'Alisson',
        age: 22
    })
})