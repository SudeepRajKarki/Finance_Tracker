import {User} from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createtoken =(id) => jwt.sign({id},process.env.JWT_Secret,{expiresIn:'7d'});

export const register =async (req,res)=>{
    const{name,email,password}=req.body;

    if(await User.findOne({email})){
        res.status(400).json({message:'User already existed.'});
    }

const user= new User({name,email,password});
await user.save();

res.status(201).json({
    id:user._id,
    name:user.name,
    email:user.email,
    token:createtoken(user._id)

});
};

export const login=async (req,res)=>{
   const{email,password}=req.body;

   const user =await User.findOne({email});
   if (!user) return res.status(400).json({message:"Enter correct email"});

   const ismatch = await bcrypt.compare(password,user.password);
   if (!ismatch) return res.status(400).json({message:"Enter a valid Password"});

   res.json({
    id:user._id,
    name:user.name,
    email:user.email,
    token: createtoken(user._id)
   });

};




