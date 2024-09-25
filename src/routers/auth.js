import express from 'express'
import ControllerModule from '../controllers/index.js'
import checkAuth from '../auth/checkAuth.js'

const router = express.Router()

//check api key
router.use(checkAuth.apiKey)
//check permission
router.use(checkAuth.permission('0000'))

router.post('/sign-up', checkAuth.asyncHandler(ControllerModule.AuthController.signUp))
export default router


