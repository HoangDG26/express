import userModel, { USER_ROLE } from "../models/user.js"
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import KeyTokenService from "./keyToken.js"
import createTokenPair from "../auth/authUtils.js"
import { getInforData } from "../utils/index.js"
class AuthService {
    static signUp = async ({ name, email, password }) => {
        try {
            const user = await userModel.findOne({ email }).lean()

            if (user) {
                return {
                    code: 409,
                    message: "conflict user"
                }

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
                    return {
                        code: 'xxx',
                        message: "keyStore error"
                    }
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
        } catch (error) {
            return {
                code: 'xxx-',
                message: error.message,
                status: 'error'
            }
        }
    }
}
export default AuthService