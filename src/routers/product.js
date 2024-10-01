import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()



//search khong can check authen
router.get('/search/:keySearch', asyncHandler(ControllerModule.ProductController.searchProducts))//search product publish by keySearch
router.get('/', asyncHandler(ControllerModule.ProductController.findAllProducts))//get all products
router.get('/:id', asyncHandler(ControllerModule.ProductController.findProductById))//get product by id


router.use(authentication)
/////////////////////////////
router.post('/', asyncHandler(ControllerModule.ProductController.createProduct))//create new product
router.patch('/:id', asyncHandler(ControllerModule.ProductController.updateProduct))//update product
router.post('/published/:id', asyncHandler(ControllerModule.ProductController.publishProductByShop))//publish product by id
router.post('/unpublished/:id', asyncHandler(ControllerModule.ProductController.unPublishProductByShop))//unpublish product by id

//Query
router.get('/draft/all', asyncHandler(ControllerModule.ProductController.findAdllDraft))//get all draft product
router.get('/published/all', asyncHandler(ControllerModule.ProductController.findAdllPublished))//get all publish product

export default router



