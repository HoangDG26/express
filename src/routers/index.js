import authRouter from './auth.js'
import productRouter from './product.js'
import checkAuth from '../auth/checkAuth.js'
import express from 'express'
const router = express.Router()


//check api key
router.use(checkAuth.apiKey)
//check permission
router.use(checkAuth.permission('0000'))
router.use('/product', productRouter)//router tổng của product
router.use('/auth', authRouter)//router tổng của auth



export default router