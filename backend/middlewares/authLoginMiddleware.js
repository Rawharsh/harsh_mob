import User from "../models/User"
import bcrypt from "bcrypt"

export const  authLoginMiddleware = async(req,res,next)=>{
    try{
        
            const {username,password,deviceToken}  = req.body;

            const user = await User.findOne({username});

            if(!user){
                res.status(401).json({Error : "Invalid username or password" });
                
            }

            const isPassword  = await bcrypt.compare(password,user.password);

            if(!isPassword){
                res.status(401).json({Error : "Invalid username or password" });
            }

            req.user = user;

            next();
    }catch(err){
            console.error(err);
            res.status(500).json({error : "server error"});
    }

   


}