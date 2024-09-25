import userModel, { USER_ROLE } from "../models/user.js"
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import KeyTokenService from "./keyToken.js"
import createTokenPair from "../auth/authUtils.js"
import { getInforData } from "../utils/index.js"
import { ConfictResponeError } from "../handle-response/error.response.js"
class AuthService {
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
            console.log('user:', newUser)

            return {
                code: 201,
                metadata: {
                    user: getInforData({
                        fields: ['_id', 'name', 'email'],
                        object: newUser
                    }),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
    }
}

export default AuthService