import mongoose from "mongoose";
import { envConfig } from "../configs/config.js";

const host = envConfig.database.host
const port = envConfig.database.port
const database_name = envConfig.database.name

const connectionString = `mongodb://${host}:${port}/${database_name}`
//const connectionString = `mongodb://localhost:27017/demo`
async function conect() {
    try {
        let connection = await mongoose.connect(connectionString)
        console.log('Connect mongo succesfully')
        return connection
    } catch (error) {
        throw new Error('Cannot connect to mongo')
    }
}
export { conect }