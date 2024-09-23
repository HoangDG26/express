import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    res.send('get user')
})

router.post('/login', (req, res) => {
    res.send('post user')
})
router.post('/register', (req, res) => {
    res.send('regiter user')
})
router.patch('/', (req, res) => {
    res.send('PATCH user')
})
export default router


