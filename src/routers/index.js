import authRouter from './auth.js'
import productRouter from './product.js'
import checkoutRouter from './checkout.js'
import checkAuth from '../auth/checkAuth.js'
import cartRouter from './cart.js'
import inventoryRouter from './inventory.js'
import discountRouter from './discount.js'
import commentRouter from './comment.js'
import express from 'express'
const router = express.Router()


//check api key
router.use(checkAuth.apiKey)
//check permission
router.use(checkAuth.permission('0000'))

router.use('/product', productRouter)//router tổng của product
router.use('/checkout', checkoutRouter)//router tổng của product
router.use('/discount', discountRouter)
router.use('/cart', cartRouter)
router.use('/inventory', inventoryRouter)
router.use('/comment', commentRouter)
router.use('/auth', authRouter)//router tổng của auth



export default router