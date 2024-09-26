
import JWT from 'jsonwebtoken'
import { envConfig } from '../configs/config.js'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { HEADER } from './checkAuth.js'
import { NotFoundResponeError, UnauthorizedResponeError } from '../handle-response/error.response.js'
import KeyTokenService from '../services/keyToken.js'

const createTokenPair = async (payload, publicKey, privateKey) => {
    const accessToken = JWT.sign(payload, publicKey,
        { expiresIn: envConfig.jwt.expiresIn_accesstoken })

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
}
const authentication = asyncHandler(async (req, res, next) => {
    /*
    1. check userid missing
    2. get access token
    3 verify token
    4.check user
    5.check key store with user id
    6. return next()
    */
    //1
    const userId = req.headers[HEADER.CLIENT_ID]
    console.log('âsdsdsd', userId);
    if (!userId) throw new UnauthorizedResponeError('Invalid userid')
    //2
    const keyStore = await KeyTokenService.findKeyByUserId(userId)
    console.log('bbbbb', keyStore);
    if (!keyStore) throw new NotFoundResponeError('Not Found key Store')
    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new NotFoundResponeError('Access Token key Store')
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new UnauthorizedResponeError('Invalid userId')
        req.keyStore = keyStore
        return next()
    } catch (err) {
        throw err
    }

})
export { createTokenPair, authentication }