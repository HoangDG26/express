import { CreatedSuccess } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class CheckOutController {
    static checkoutReview = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Checkout review successfull',
            metadata: await ServiceModule.CheckoutService.checkoutReview({
                ...req.body,
            })
        }).sendResponse(res)
    }

}
export default CheckOutController