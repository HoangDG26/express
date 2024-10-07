import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()

router.post('/review', asyncHandler(ControllerModule.CheckOutController.checkoutReview))

router.use(authentication)


export default router


