import { ForbiddenResponeError } from "../handle-response/error.response.js"
import apiKeyService from "../services/apiKey.js"

export const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log(key)
        if (!key) {
            throw new ForbiddenResponeError('Forbidden Error (key invalid)')
        }
        //check objetc key
        const objKey = await apiKeyService.findById(key)
        console.log(objKey)
        if (!objKey) {
            throw new ForbiddenResponeError('Forbidden Error (objKey invalid)')
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        next(error)
    }
}
const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            throw new ForbiddenResponeError('Permission denied')
        }
        console.log('permissions::', req.objKey.permissions)
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            throw new ForbiddenResponeError('Permission denied')
        }
        return next()
    }

}

const checkAuth = { apiKey, permission }
export default checkAuth