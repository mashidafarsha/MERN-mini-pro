const userModel=require('../model/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'thisissecretkey', {
        expiresIn: maxAge,
    }
    )
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





module.exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        const {name,phone, email, password } = req.body
        const user = await userModel.create({name,phone, email, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,

        })

        res.status(201).json({ user: user._id,name: user.name, created: true })


    } catch (err) {
        console.log(err);
        const errors = handleError(err);
        console.log(errors);
        res.json({ errors, created: false })
    }
}

module.exports.login = async (req, res, next) => {
    try{
        console.log(req.body)
        let { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            console.log(validPassword,"lllllllll");
         if (validPassword) {
            console.log("pppppppppp");
            const token = createToken(user._id);
            res.cookie("jwt", token, {
                withCredential: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            })
            res.status(200).json({ user, token, created: true });
        } else {
            const errors = { email: "Incorrect username or password" }
            res.json({ errors, created: false })
        }
    }else {
        const errors = { email: "User Name not exists" }
        res.json({ errors, created: false })
    }
    
    }catch (err) {
        const errors = { email: "Some thing went wrong" }
        res.json({ errors, created: false })
    }
}


    