import express from 'express'
import { connectDatabase } from '../dbs/database.config.js'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRouter } from '../routers/index.js'
import compression from 'compression'
import checkAuth from '../auth/checkAuth.js'

const app = express()

//midleware----------------------
app.use(express.json())
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))
//chuyen 

//database---------------------
connectDatabase()
//routers------------------------
app.use('/api/v1/auth', authRouter)
// app.use('api/v1/students', authRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)//đưa xuống handle error
})
//Handle error-----------------
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    return res.status(statusCode).json({
        status: 'Error!',
        code: statusCode,
        // stack: err.stack,
        message: err.message || 'Internal Server Error'
    })
})


export default app

