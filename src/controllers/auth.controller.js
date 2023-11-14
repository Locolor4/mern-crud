import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req,res) => {
    
    const {username, email, password} = req.body

    const passwordHashed = await bcrypt.hash(password, 10) 

    try {

        const newUser = new User({
            username,
            email,
            password: passwordHashed
        })

        const userCreated = await newUser.save()
        
        const token = await createAccessToken({
            id: userCreated._id
        })

        res.cookie('token', token)
        res.json(userCreated)
        console.log(`User ${username} succesfully saved`);

    } catch (error) {

        console.error(error);
        res.status(500).json({msg: `not saved, error: ${error.message}`})
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body

    try {
        
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({msg: 'User not found'})

        const passwordMatch = await bcrypt.compare(password, userFound.password)
        if(!passwordMatch) return res.status(400).json({msg: `Password Incorrect`})

        const token = await createAccessToken({id: userFound._id})

        res.cookie('token', token)
        res.json({userFound})

    } catch (error) {

        console.error(error);
        res.json({msg: `error: ${error.msg}`})
    }
}

export const logout = (req,res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req,res) => {
    
    const userData = await User.findById(req.user.id)

    if(!userData) return res.status(400).json({msg: `Usuario no encontrado`})
    
    return res.json(userData)
}