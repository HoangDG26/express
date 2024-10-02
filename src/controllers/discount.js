import { CreatedSuccess } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class DiscountController {
    static createDiscountCode = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Created Discount create successfull',
            metadata: await ServiceModule.DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })
        }).sendResponse(res)
    }

    static getAllDiscountCodeWithProduct = async (req, res, next) => {
        new CreatedSuccess({
            message: 'found discount success',
            metadata: await ServiceModule.DiscountService.getAllDiscountCodeWithProduct({
                ...req.query,
                //   shopId: req.user.userId
                // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })
        }).sendResponse(res)
    }
    static getAllDiscountByShop = async (req, res, next) => {
        new CreatedSuccess({
            message: 'found discount success',
            metadata: await ServiceModule.DiscountService.getAllDiscountCodeByShop({
                ...req.query,
                //   shopId: req.user.userId
                // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })
        }).sendResponse(res)
    }
    static getDiscountAmount = async (req, res, next) => {
        new CreatedSuccess({
            message: 'getDiscountAmount success',
            metadata: await ServiceModule.DiscountService.getDiscountAmount({
                ...req.body,
                //   shopId: req.user.userId
                // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })
        }).sendResponse(res)
    }
    //..........

}
export default DiscountController