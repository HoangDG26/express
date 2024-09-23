import express from 'express'
import { userRouter, studentRouter } from './src/routers/index.js'
import { conect } from './src/dbs/database.config.js'
import helmet from 'helmet'
import { envConfig } from './src/configs/config.js'


const app = express()

//midleware
app.use(express.json())//cho phep doc body cua request
app.use(helmet())
//routers
app.use('/users', userRouter)
app.use('/student', studentRouter)

conect()

const port = envConfig.app.port
app.listen(port, async () => {
    console.log(`Listening on port http://localhost:${port}`)
})