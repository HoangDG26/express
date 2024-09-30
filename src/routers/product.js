import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()



//search khong can check authen
router.get('/search/:keySearch', asyncHandler(ControllerModule.ProductController.searchProducts))

router.use(authentication)
/////////////////////////////
router.post('/', asyncHandler(ControllerModule.ProductController.createProduct))
router.post('/published/:id', asyncHandler(ControllerModule.ProductController.publishProductByShop))
router.post('/unpublished/:id', asyncHandler(ControllerModule.ProductController.unPublishProductByShop))

//Query
router.get('/draft', asyncHandler(ControllerModule.ProductController.findAdllDraft))
router.get('/published', asyncHandler(ControllerModule.ProductController.findAdllPublished))

export default router



