import { CreatedSuccess, Success } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class AuthController {
    static signUp = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Created user',
            metadata: await ServiceModule.AuthService.signUp(req.body)
        }).sendResponse(res)
    }
    static signIn = async (req, res, next) => {
        new Success({
            message: 'Signed in user',
            metadata: await ServiceModule.AuthService.signIn(req.body)
        }).sendResponse(res)
    }
    static signOut = async (req, res, next) => {
        new Success({
            message: 'Signed out user',
            metadata: await ServiceModule.AuthService.signOut(req.keyStore)
        }).sendResponse(res)
    }
}

export { AuthController } 