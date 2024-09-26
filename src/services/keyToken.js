import mongoose from "mongoose"
import keyModel from "../models/key-token.js"

class KeyTokenService {

    static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId, },
                update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
                options = { upsert: true, new: true }
            const tokens = await keyModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }


    static findKeyByUserId = async (userId) => {
        console.log('ccccc', userId)
        try {
            return await keyModel.findOne({ user: userId }).lean()
        } catch (error) {
            error
        }

    }

    static deleteById = async (id) => {
        return await keyModel.deleteOne(id)
    }
}

export default KeyTokenService