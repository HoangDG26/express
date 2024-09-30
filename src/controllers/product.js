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

    static publishProductByShop = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Publish Product Sucess ',
            metadata: await ServiceModule.ProductService.publishProductByShop({
                product_id: req.params.id,//quey param trên post man
                product_shop: req.user.userId
                // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })

        }).sendResponse(res)

    }
    static unPublishProductByShop = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Unpublish Product Sucess ',
            metadata: await ServiceModule.ProductService.unPublishProductByShop({
                product_id: req.params.id,//quey param trên post man
                product_shop: req.user.userId
                // sau khi decode ra thì có userId và email của người dùng lấy cái đó luôn 
            })

        }).sendResponse(res)

    }
    /**  cú pháp cmt =>  / ** 
     * @description get all draft shop
     * @param {Number} limit 
     * @param {Number} skip 
     * @param {*} next 
     * @return {JSON}
     *     */
    static findAdllDraft = async (req, res, next) => {
        new Success({
            message: 'Get All Product Draft',
            metadata: await ServiceModule.ProductService.findAdllDraft({ product_shop: req.user.userId })
        }).sendResponse(res)
    }
    /**  cú pháp cmt =>  / ** 
        * @description get all draft shop
        * @param {Number} limit 
        * @param {Number} skip 
        * @param {*} next 
        * @return {JSON}
        *     */
    static findAdllPublished = async (req, res, next) => {
        new Success({
            message: 'Get All Product Published',
            metadata: await ServiceModule.ProductService.findAdllPublished({ product_shop: req.user.userId })
        }).sendResponse(res)
    }
    static searchProducts = async (req, res, next) => {
        new Success({
            message: 'search Product Published',
            metadata: await ServiceModule.ProductService.searchProducts(req.params)
        }).sendResponse(res)
    }
}

export { ProductController } 