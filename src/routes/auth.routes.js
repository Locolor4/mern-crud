import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {register,login,logout,profile} from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router