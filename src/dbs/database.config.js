import mongoose from "mongoose";
import { envConfig } from "../configs/config.js";

const host = envConfig.database.host
const port = envConfig.database.port
const database_name = envConfig.database.name

const connectionString = `mongodb://${host}:${port}/${database_name}`
async function connectDatabase() {
    try {
        let connection = await mongoose.connect(connectionString)
        console.log('Connect mongo succesfully')
        return connection
    } catch (error) {
        throw new Error('Cannot connect to mongo')
    }
}
export { connectDatabase }