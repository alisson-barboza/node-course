const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:17017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
