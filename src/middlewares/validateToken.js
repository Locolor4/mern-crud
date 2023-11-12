import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const authRequired = (req,res,next) => {
    
    const {token} = req.cookies
    
    if(!token) return res.status(401).json({msg: `Token not found, access denied`})
    
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        
        if(err) return res.status(403).json({msg: `Invalid token, error: ${err.message}`})
        req.user = decoded
        next()
    })    
}