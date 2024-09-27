import userModel, { USER_ROLE } from "../models/user.js"
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import KeyTokenService from "./keyToken.js"
import { createTokenPair, verifyJWT } from "../auth/authUtils.js"
import { getInforData } from "../utils/index.js"
import { BadRequestResponeError, ConfictResponeError, ForbiddenResponeError, NotFoundResponeError, UnauthorizedResponeError } from "../handle-response/error.response.js"
import UserService from "./user.js"
class AuthService {
    /*  sign in
    1.check email
    2.match password
    3.create accesstoken, refreshtoken and save
    4.generate tokens
    5.get data -> return login  
    */
    static signIn = async ({ email, password, refreshToken = null }) => {
        //1
        const user = await UserService.findUserByEmail({ email })
        if (!user) throw new NotFoundResponeError('User invalid! register and try again')
        //2
        const password_match = bcrypt.compare(password, user.password)
        if (!password_match) throw new NotFoundResponeError('Password not match')
        //3
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const { _id: userId } = user
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
        await KeyTokenService.createToken({
            userId,
            refreshToken: tokens.refreshToken,
            privateKey, publicKey
        })
        return {
            user: getInforData({
                fields: ['_id', 'name', 'email'],
                object: user
            }),
            tokens
        }

    }
    static signOut = async (keyStore) => {
        const deleteKey = await KeyTokenService.deleteById(keyStore._id)
        console.log(deleteKey)
        return deleteKey
    }
    //register account
    static signUp = async ({ name, email, password }) => {

        const user = await userModel.findOne({ email }).lean()

        if (user) {
            throw new ConfictResponeError('[Error]: User already registered !')

        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name, email, password: passwordHash, roles: [USER_ROLE.USER]
        })

        if (newUser) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            const keyStore = await KeyTokenService.createToken({
                userId: newUser._id,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                throw new ConfictResponeError('[Error]: keyStore already registered !')
            }
            const tokens = await createTokenPair(
                { userId: newUser._id, email },
                publicKey,
                privateKey)

            console.log('Created Token Successfully:', tokens)
            return {
                user: getInforData({
                    fields: ['_id', 'name', 'email'],
                    object: newUser
                }),
                tokens
            }
        }
        return {
            code: 200,
            metadata: null
        }
    }
    static handlerRefreshToken = async ({ keyStore, user, refreshToken }) => {
        const { userId, email } = user
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteAllById(userId)
            throw new ForbiddenResponeError('Something wrong happed,plz re-sign in')
        }
        if (keyStore.refreshToken !== refreshToken)
            throw new UnauthorizedResponeError('[1]::User Invalid')
        const foundUser = await UserService.findUserByEmail({ email })
        if (!foundUser) throw new UnauthorizedResponeError('[2]::User Invalid')
        //create token moi
        const tokens = await createTokenPair({ userId, email }, keyStore.publicKey, keyStore.privateKey)
        //update token
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })
        return {
            user,
            tokens

        }
    }
}


export default AuthService