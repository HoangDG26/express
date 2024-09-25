import express from 'express'
import { connectDatabase } from '../dbs/database.config.js'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRouter } from '../routers/index.js'

const app = express()

//midleware----------------------
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))

//routers------------------------
app.use('/api/v1/auth', authRouter)
// app.use('api/v1/students', authRouter)

//database---------------------
connectDatabase()
//Handle error-----------------



export default app

