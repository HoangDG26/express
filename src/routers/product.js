import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()



// router.use(checkAuth.apiKey)
// //check permission
// router.use(checkAuth.permission('0000'))

router.use(authentication)
router.post('/', asyncHandler(ControllerModule.ProductController.createProduct))

export default router



