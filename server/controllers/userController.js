

//controller for user registration

import Resume from "../models/resume.js";
import User from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
const generateToken = (userId) =>{
	const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'
	})

	return token;
}
// POST: /api/users/register
export const registerUser = async(req,res)=>{
    try{
          const {name,email,password} = req.body;

		  if(!name || !email || !password){
			return res.status(400).json({message:"missing required fields"})
		  }

		  const user = await User.findOne({email})

		  if(user){
			return res.status(400).json({message:"user already exist"})
		  }

		  // create new user

		  const hashedpassword = await bcrypt.hash(password,10)
		  const newuser = await User.create({name,email,password:hashedpassword})

          const token = generateToken(newuser._id)
		  newuser.password = undefined;

		  return res.status(201).json({message:'user created successfully',token,user:newuser})
	}
	catch(error){
        return res.status(400).json({message:error.message})
	}
}


// controller for user login
//POST:  /api/users/login
export const loginUser = async(req,res)=>{
    try{
          const {email,password} = req.body;

		  const user = await User.findOne({email})

		  if(!user){
			return res.status(400).json({message:"Invalid Email or password"})
		  }
          //check if password is correct or not

		  if(!user.comparePassword(password)){
			return res.status(400).json({message:"Invalid Email or password"})
		  }

		  // return success message

          const token = generateToken(user._id)
		  user.password = undefined;

		  return res.status(200).json({message:'Login successfully',token,user})
	}
	catch(error){
        return res.status(400).json({message:error.message})
	}
}

//controller for getting user by id
//GET: /api/users/data

export const getUserById = async(req,res)=>{
    try{

		  const userId = req.userId;
        
		  //check if user exist
		  const user = await User.findById(userId)
        if(!user){
			return res.status(404).json({message:'User not found'})
		}

        user.password = undefined;

		  return res.status(200).json({user})
	}
	catch(error){
        return res.status(400).json({message:error.message})
	}
}


// controller for getting user resumes
// GET: /api/users/resumes

export const getUserResumes = async(req,res) =>{
  try{
      
	const userId = req.userId;

	// return user resumes
	const resumes = await Resume.find({userId})
	return res.status(200).json({resumes})


  } catch(error){
	   return res.status(400).json({message: error.message})
  }
}

