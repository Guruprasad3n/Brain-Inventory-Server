const msgModel = require("../Model/msgModel");
const userModel = require("../Model/userModel")
module.exports.signup = async (req, res) => {
  try{

    const {name, email, password, phone} = req.body;
    const user = new userModel({name, email, password, phone});
    await user.save()
    if (user) {
      return res.status(201).send("Succeccfull Signup");
    } 
  }
  catch(e){
    res.send("Email Already Exist");
  }
}

module.exports.login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password})
    if(user){
       return res.status(200).send({message:"Login Successful"})
    }
    else{
        return res.status(401).send("Invalid Credintials")
    }
}

module.exports.addMsg = async(req, res)=>{
try{
const {text} = req.body;
const exist = await userModel.findById(re.user.id)
let newMsg = new msgModel({
  user:req.user.id,
  username:exist.username,
  text
})
// await new
}catch(e){

}
}
