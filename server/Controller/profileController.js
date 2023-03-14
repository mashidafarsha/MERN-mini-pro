const userModel=require('../model/userSchema')

const updateProfile=async(req,res,next)=>{

try{
    console.log(req.headers.userid,"yyyyyyyyyyyy");
    console.log(req.files);
    req.files.image[0].path = req.files.image[0].path.replace('public', "");
    
    console.log(req.files.image[0].path,"ttttttttttt");
    let user = await userModel.findOne({ _id: req.headers.userid })
console.log(user);
    if(user){
        await userModel.updateOne({ _id: req.headers.userid }, {
            $set: {
                image: req.files.image[0]
            }
        }).then(async()=>{
            let users = await userModel.findOne({ _id: req.headers.userid })
            console.log(users,"rrrrrrrrr");
            res.json({ message: "Image uploaded successfully", users, status: 'sssss' });
        }).catch((err) => {
            console.log(err);
            // res.json({ message: "Something went wrong", status: false });
            
        })

    } else {
            // res.json({ message: "User Not Exists", status: false });
            console.log("errrr");
     }

}catch(err){
console.log(err);
// res.json({ message: "Something went wrong", status: false });
}
}

module.exports = {
    updateProfile
};