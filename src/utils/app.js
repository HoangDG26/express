import express from 'express'
import { connectDatabase } from '../dbs/database.config.js'
import helmet from 'helmet'
import morgan from 'morgan'
import superRouter from '../routers/index.js'
import compression from 'compression'

const app = express()

//midleware----------------------
app.use(express.json())
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))

//database---------------------
connectDatabase()

//routers------------------------

app.use('/api/v1', superRouter)

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
        stack: err.stack,
        message: err.message || 'Internal Server Error'
    })
})


export default app

