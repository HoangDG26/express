
import JWT from 'jsonwebtoken'
import { envConfig } from '../configs/config.js'
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey,
            { expiressIn: envConfig.jwt.expiresIn_accesstoken })

        const refreshToken = JWT.sign(payload, privateKey,
            { expiresIn: envConfig.jwt.expiresIn_refreshtoken })

        JWT.verify(accessToken, publicKey,
            (err, decode) => {
                if (err) {
                    console.log(`error verify::`, err)
                } else {
                    console.log(`decode verify::`, decode)
                }

            }
        )
        return { accessToken, refreshToken }

    } catch (error) {

    }
}
export default createTokenPair