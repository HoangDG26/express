import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    res.send('get student')
})
router.get('/:id', (req, res) => {
    debugger
    res.send('get student')
})

router.post('/login', (req, res) => {
    res.send('post usstudenter')
})
router.post('/register', (req, res) => {
    res.send('regiter usstudenter')
})
router.patch('/', (req, res) => {
    res.send('PATCH student')
})
export default router