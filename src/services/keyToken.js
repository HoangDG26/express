import keyModel from "../models/key-token.js"

class KeyTokenService {

    static createToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keyModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

export default KeyTokenService