const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    }
})
const userModel = model("User", userSchema) 
module.exports = userModel