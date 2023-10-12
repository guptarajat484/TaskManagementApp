const {  Schema, model,  } = require("mongoose");

const taskSchema = Schema({
    taskName: {
        type: String,
    },
    taskDescription: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
},);

module.exports = model('Task',taskSchema)