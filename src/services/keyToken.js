import mongoose from "mongoose"
import keyModel from "../models/key-token.js"

class KeyTokenService {
    //save token
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

    //find key by user id
    static findKeyByUserId = async (userId) => {
        try {
            return await keyModel.findOne({ user: userId })
        } catch (error) {
            error
        }

    }
    //delete key by id
    static deleteById = async (id) => {
        return await keyModel.deleteOne(id)
    }
    //find key  by refresh token used
    static findByRefreshTokensUsed = async (refreshToken) => {
        return await keyModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }
    //find key  by refresh token
    static findByRefreshToken = async (refreshToken) => {
        return await keyModel.findOne({ refreshToken })
    }
    //delete key by userId
    static deleteAllById = async (userId) => {
        return await keyModel.deleteOne({ user: userId })
    }
}

export default KeyTokenService