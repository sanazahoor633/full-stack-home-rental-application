import User from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginAuth = async (req, res) => {
const {email, password} = req.body;
try{

    const user = await User.findOne({email})
if(!user) return res.status(409).json({message: 'User does not exist'})
let isPassword = bcrypt.compareSync(password, user.password);
if(!isPassword) return res.status(401).json({message: 'Invalid password'})
    //jwt token
const jsonTokenFromEnv = process.env.JSON_TOKEN
const token = jwt.sign({id: user._id}, jsonTokenFromEnv);
delete user.password;
res.status(200).json({token, user})
}

catch(err){
res.status(500).json({error: err.message})
}

}