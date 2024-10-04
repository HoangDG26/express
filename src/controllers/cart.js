import { CreatedSuccess } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class CartController {
    /**
     * @description : 'add to cart'
     * @param {int} userId
     * @param {*} res 
     * @param {*} next 
     * @method POST
     * @url /v1/api/cart/user
     */
    static addToCart = async (req, res, next) => {
        new CreatedSuccess({
            message: 'add to cart successfull',
            metadata: await ServiceModule.CartService.addToCart({
                ...req.body, cart_userId
            })
        }).sendResponse(res)
    }
    static getListCart = async (req, res, next) => {
        new CreatedSuccess({
            message: 'get list cart successfull',
            metadata: await ServiceModule.CartService.getListUserCart(
                req.query,
            )
        }).sendResponse(res)
    }

    static updateCart = async (req, res, next) => {
        new CreatedSuccess({
            message: 'update cart successfull',
            metadata: await ServiceModule.CartService.addToCartV2({
                ...req.body,
            })
        }).sendResponse(res)
    }
    static deleteCart = async (req, res, next) => {
        new CreatedSuccess({
            message: 'delete cart successfull',
            metadata: await ServiceModule.CartService.deleteCart({
                ...req.body,
            })
        }).sendResponse(res)
    }


}
export default CartController