const jwt=require('jsonwebtoken');
const userModel=require('../model/userSchema')



const verifyLogin=(req,res,next)=>{
    console.log("nn");
    const token=req.cookies.jwt;
    console.log(token,"token");
    if(token){
        jwt.verify(token, 'thisissecretkey', async (err, decoded)=>{
            // console.log(decoded.iat);

            if(err){
                res.json({status:false});
                
                // next();
            }else{

                const user=await userModel.findById({_id:decoded.id});
                // const user=usermodel.find();
                console.log(user);

                if(user){
                    res.json({status:true,user:user.email});
                    next()
                }else{
                    res.json({status:false})
                    // next()
                }
            }
        });
    }else{
        res.json({ status: false })
        // next()
    }
}

module.exports={verifyLogin}
