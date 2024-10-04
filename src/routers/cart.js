import express from 'express'
//import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()




router.get('/:userId?', asyncHandler(ControllerModule.CartController.getListCart))
router.post('/', asyncHandler(ControllerModule.CartController.addToCart))
router.put('/', asyncHandler(ControllerModule.CartController.updateCart))
router.delete('/', asyncHandler(ControllerModule.CartController.deleteCart))
//router.use(authenticatioCartController)


export default router