const User = require("../models/user");



exports.registerUser = (async(req,res)=>{

    const { firstName, lastName, email, phone , password} = req.body;
   console.log(req.body);
    try{
    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password
    })
    console.log("Registration Success (:");
   }
   catch(e){
      console.log("Error While Registering User");
      console.log(e);
      res.status(400).send(e.message);
   }
   res.status(200).send("Registration Successful!");
})


exports.loginUser = (async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email}).select('+password');
        if(!user){
            console.log("No User Found!");
            res.status(404).send(new Error("User Not Found!"));
        }
        if(!password == user.password){
            res.status(401).send(new Error("Invalid Credentials"));   
        }
        res.status(200).send("Login Successful");
    }
    catch(e){
        console.log("Login Successful");
        console.log(e);
        res.status(400).send(e.message);
    }
})


exports.getUserProfile = (async(req,res)=>{
    // console.log(req.body);
    // console.log("HIIII");
    try{
   
    const user = await User.findById(req.body.id);
    
   if(user){ 
    res.status(200).json({
        success : true,
        user
    })
   }
   else{
    res.status(404).send("User Not Found")
   } 
   }
   catch(e){
    res.status(400).send("Unable to get the User Details");
   }

})



exports.updateUserProfile = (async(req,res)=>{
    let user;
    try{
    user = await User.findById(req.body.id).select('+password');
    }
    catch(e){
        res.status(400).send("Internal Server Error for getting the Details")
    }

    console.log(user);
    if(user.password == req.body.password){
      
        const newData = {
            firstName : (req.body.firstName)?req.body.firstName:user.firstName,
            lastName  : (req.body.lastName)?req.body.lastName:user.lastName, 
            email : (req.body.email)?req.body.email : user.email,
            phone : (req.body.phone)?req.body.phone : user.phone,
            password : (req.body.password)?req.body.password:user.password
        }

   
       const filter = {"_id":req.body.id}
       try{
       user = await User.findOneAndUpdate(filter,newData)
       if(user){
        res.status(200).send("Updated Successfully")
       }
       else{
        res.status(400).send("Update Unsuccessful")
       }
       }
       catch(e){
        console.log("Internal Server Error Occurred While Update");
       }
    }  
    else{
        res.status(401).send("Password Mismatch");
    }

})