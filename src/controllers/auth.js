import ServiceModule from "../services/index.js"

class AuthController {
    static signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body)
            return res.status(201).json(
                await ServiceModule.AuthService.signUp(req.body)
            )
        } catch (error) {
            next(error)
        }
    }
}

export { AuthController } 