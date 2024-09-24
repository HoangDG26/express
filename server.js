import express from 'express'
import { userRouter, studentRouter } from './src/routers/index.js'
import { conect } from './src/dbs/database.config.js'
import helmet from 'helmet'
import { envConfig } from './src/configs/config.js'
import morgan from 'morgan'


const app = express()

//midleware
app.use(express.json())//cho phep doc body cua request
app.use(morgan('dev'))
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))

//routers
app.use('/api/v1/users', userRouter)
// app.use('api/v1/students', studentRouter)

//database
conect()

const port = envConfig.app.port
app.listen(port, async () => {
    console.log(`Listening on port http://localhost:${port}`)
})