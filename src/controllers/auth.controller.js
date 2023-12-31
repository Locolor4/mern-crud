import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const register = async (req,res) => {
    
    const {username, email, password} = req.body

    
    try {

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(['Email alrdy used'])

        const passwordHashed = await bcrypt.hash(password, 10) 
        
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
        if(!userFound) return res.status(400).json(['User not found'])

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

export const verifyToken = async (req,res) => {

    const {token} = req.cookies
    if(!token) return res.status(401).json(['Unauthorized'])

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if(err) return res.status(401).json(['Unauthorized'])
        
        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json(['User not found'])

        return res.json(userFound)
    })
}