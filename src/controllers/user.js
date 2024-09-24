import ServiceModule from "../services/index.js"

class UserController {
    static signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body)
            return res.status(201).json(
                await ServiceModule.UserService.signUp(req.body)
            )
        } catch (error) {
            next(error)
        }
    }
}

export { UserController } 