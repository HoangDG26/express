import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()



router.use(authentication)
router.post('/', asyncHandler(ControllerModule.InventoryController.addStocktoInventory))



export default router
