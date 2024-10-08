import redis from 'redis'
import { promisify } from 'util'
import invenRepo from '../models/repositories/iventory.js'

const redisClient = redis.createClient()

const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const sentnxAsync = promisify(redisClient.setNX).bind(redisClient)

const acquirelock = async (productId, quantity, cartId) => {
    const key = `lock_v2024_${productId}`
    const retryTime = 10 // 10 lan 
    const expireTime = 3000 // 3000 milisecond
    for (let i = 0; i < retryTime.length; i++) {
        // tao 1 key , ai cos no thi vao thanh toan
        const result = await sentnxAsync(key, expireTime)
        console.log("🚀~ result:::", result)
        if (result === 1) {
            //thao tac với inventory
            const isReveration = await invenRepo.reservationInventory({
                productId,
                quantity,
                cartId
            })
            if (isReveration.modifiedCount) {
                await pexpire(key, expireTime)
                return key
            }
            return null
        } else {
            await new Promise((resolve) => {
                setTimeout(resolve, 50)

            })
        }
    }
}
const releaseLock = async keylock => {
    const delAsyncKey = promisify(redisClient.de).bind(redisClient)
    return await delAsyncKey(keylock)
}
const redisService = { acquirelock, releaseLock }
export default redisService