import apiKeyModel from "../models/api-key.js"
import crypto from 'node:crypto'
const findById = async (key) => {
    // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] })
    // console.log('newKey:', newKey);

    const objKey = await apiKeyModel.findOne({ key, status: true }).lean()
    //console.log('Found API Key:', objKey);
    return objKey
}
const apiKeyService = { findById }
export default apiKeyService