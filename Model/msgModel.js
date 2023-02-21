const {Schema, model, default: mongoose,} = require("mongoose")

const msgSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
       default: Date.now
    }
})
const msgModel = model("message", msgSchema) 
module.exports = msgModel