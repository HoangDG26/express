
import JWT from 'jsonwebtoken'
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, publicKey,
            { expiressIn: '2 days' })

        const refreshToken = JWT.sign(payload, privateKey,
            { expiressIn: '7 days' })

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