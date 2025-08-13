import express from "express"
const router = express.Router();
import User from "../models/User.js"
import { validateSignup } from "../middlewares/validateUser.js";


router.get('/', (req,res)=>{
  console.log("we are in backend / page ")
  res.send("hi we are in backend");
});

router.post('/login',(req,res)=>{
      const {username,password,deviceId}  = req.body;
      res.send("un=>" + username + " password =>" + password + "deviceId=>" +  deviceId);
})


router.post("/signup",validateSignup, async(req, res) => {
  try{
     const user = new User(req.body)
     await user.save();

     res.status(201).json({message : "User registaration data saved otp verification pending ",
        user
     });
  }catch(err){
    res.status(500).json({message : "Erorr saving user",error : err.message});
  }

});

router.post("/verify-otp",(req,res)=>{
  const {otp,phoneNo,email} = req.body;

  res.json({message : "otp gain ",
    otp,
    phoneNo,
    email
   })
});

export default router;