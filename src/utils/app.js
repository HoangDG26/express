import express from 'express'
import { connectDatabase } from '../dbs/database.config.js'
import helmet from 'helmet'
import morgan from 'morgan'
import { userRouter } from '../routers/index.js'

const app = express()

//midleware----------------------
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))

//routers------------------------
app.use('/api/v1/users', userRouter)
// app.use('api/v1/students', studentRouter)

//database---------------------
connectDatabase()
//Handle error-----------------



export default app

