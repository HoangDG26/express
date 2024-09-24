import express from 'express'
import ControllerModule from '../controllers/index.js'

const router = express.Router()

router.post('/', (req, res) => {
    res.send('post user')
})
router.post('/sign-up', ControllerModule.UserController.signUp)
export default router


