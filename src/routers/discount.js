import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()



//router.get('/product-code', asyncHandler(ControllerModule.DiscountController.getAllDiscountCodeByShop))//search product publish by keySearch

router.get('/', asyncHandler(ControllerModule.DiscountController.getAllDiscountCodeWithProduct))
router.get('/amount', asyncHandler(ControllerModule.DiscountController.getDiscountAmount))
router.use(authentication)

router.post('/', asyncHandler(ControllerModule.DiscountController.createDiscountCode))
router.get('/shop', asyncHandler(ControllerModule.DiscountController.getAllDiscountByShop))

export default router



