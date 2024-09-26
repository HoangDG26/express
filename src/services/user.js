import userModel from "../models/user.js"

class UserService {
    static findUserByEmail = async ({ email, select = {
        email: 1, password: 1, stattus: 1, roles: 1
    } }) => {
        return await userModel.findOne({ email }).select(select).lean()
    }

}
export default UserService