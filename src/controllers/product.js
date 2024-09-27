import { CreatedSuccess, Success } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class ProductController {
    static createProduct = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Created Product',
            metadata: await ServiceModule.ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })
        }).sendResponse(res)
    }

}

export { ProductController } 