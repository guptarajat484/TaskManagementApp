const mongoose =  require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task').then((connection)=>{
    console.log("Db is connected")
}).catch(err=>console.log(err))

module.exports = mongoose