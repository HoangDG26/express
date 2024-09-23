import * as dotenv from 'dotenv'
dotenv.config()//must have
const dev = {
    app: {
        port: process.env.DEV_PORT
    },
    database: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
        // password:,
    }

}
const prod = {
    app: {
        port: process.env.PROD_PORT
    },
    database: {
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        name: process.env.PROD_DB_NAME,
        // password:,
    }

}
const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'
const envConfig = config[env]
// console.log(envConfig)
export { envConfig }