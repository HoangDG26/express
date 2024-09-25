import ServiceModule from "../services/index.js"

class AuthController {
    static signUp = async (req, res, next) => {
        return res.status(201).json(
            await ServiceModule.AuthService.signUp(req.body)
        )
    }
}
export { AuthController } 