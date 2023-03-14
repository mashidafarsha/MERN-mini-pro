const userModel = require('../model/userSchema')
const adminModel = require('../model/adminSchema')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')



const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'thisissecretkey', {})
}


const handleError = (err) => {
    let errors = { email: "", password: "" }

    if (err.code === 11000) {
        errors.email = "Email is already exists";
        return errors;
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach((properties) => {
            errors[properties.path] = properties.message
        })
        return errors
    }
}


const adminLogin=async(req,res,next)=>{
    try{
        let { email, password } = req.body
        const admin = await adminModel.findOne({email})
        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            if (validPassword) {
                const token = createToken(admin._id);
                console.log(token,'897654132897645231');
            res.cookie("adminjwt", token)
            res.status(200).json({ admin, token, created: true });
        } else {
            const errors = { email: "Incorrect admin name or password" }
            res.json({ errors, created: false })
        }
    }else {
        const errors = { email: "Admin Name not exists" }
        res.json({ errors, created: false })
    }
    }catch(err){

    }
}
const getUserList = async (req, res, next) => {
    try {
        let userList = await userModel.find()
        res.json({ message: "Success", status: true, userList })
    } catch (err) {
        res.json({ message: "Some thing went wrong", status: false });
    }

}

const deleteUser = (req, res, next) => {
    try {
        let userId = req.params.userId
        console.log(userId);
        userModel.deleteOne({ _id: userId }).then((response) => {
            res.json({ message: "Success", status: true })
        })

    } catch (err) {
        res.json({ message: "Some thing went wrong", status: false })
    }
}
const editUser = (req, res, next) => {
    try {
        console.log(req.body);
        userModel.updateOne({ _id: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone

                }
            }).then((response) => {
                res.json({ message: "Updated", status: true });

            })


    } catch (err) {
        res.json({ message: "Some thing went wrong", status: false })
    }
}

const addUser =async (req, res, next)=>{
    try {
        console.log(req.body);
       
        const {name,phone, email, password } = req.body
        const user = await userModel.create({name,phone, email, password })
        res.status(201).json({message: "User Created Successfully", status: true, created: true })

    } catch (err) {
        console.log(err);
        const errors = handleError(err);
        console.log(errors);
        res.json({ errors, created: false })

    }
}

module.exports = {
    adminLogin,
    getUserList,
    deleteUser,
    editUser,
    addUser

}