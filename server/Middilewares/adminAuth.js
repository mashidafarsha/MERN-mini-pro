const jwt=require('jsonwebtoken');
const adminModel=require('../model/adminSchema')


const   verifyAdmin=(req,res,next)=>{
    const token=req.cookies.adminjwt;
    console.log(token,"kkkkkkkk");
    if(token){
        jwt.verify(token, 'thisissecretkey', async (err, decoded)=>{
            // console.log(decoded.iat);

            if(err){
                res.json({status:false});
                
                // next();
            }else{

                const user=await adminModel.findById({_id:decoded.id});
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

module.exports={verifyAdmin}