import express from 'express'
import ControllerModule from '../controllers/index.js'
import checkAuth from '../auth/checkAuth.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { authentication } from '../auth/authUtils.js'
const router = express.Router()

//check api key
router.use(checkAuth.apiKey)
//check permission
router.use(checkAuth.permission('0000'))

router.post('/sign-up', asyncHandler(ControllerModule.AuthController.signUp))
router.post('/sign-in', asyncHandler(ControllerModule.AuthController.signIn))

router.use(authentication)
router.post('/sign-out', asyncHandler(ControllerModule.AuthController.signOut))
router.post('/handler-refresh-token', asyncHandler(ControllerModule.AuthController.handlerRefreshToken))
export default router



