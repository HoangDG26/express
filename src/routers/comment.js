import express from 'express'
import { authentication } from '../auth/authUtils.js'
import ControllerModule from '../controllers/index.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
const router = express.Router()


router.use(authentication)
router.post('/', asyncHandler(ControllerModule.CommentController.createComment))
router.get('/', asyncHandler(ControllerModule.CommentController.getCommentsByParentId))
router.delete('/', asyncHandler(ControllerModule.CommentController.deleteComment))


export default router
