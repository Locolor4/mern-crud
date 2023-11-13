import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {register,login,logout,profile} from '../controllers/auth.controller.js'
import {validateSchema} from '../middlewares/validate.middleware.js'
import {loginSchema,registerSchema} from '../schemas/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router