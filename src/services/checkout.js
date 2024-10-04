import { BadRequestResponeError, NotFoundResponeError } from "../handle-response/error.response.js"
import cartRepo from "../models/repositories/cart.js"
import productRepo from "../models/repositories/product.js"
import DiscountService from "./discount.js"


class CheckoutService {
    /*
    
       {
        "cartId": "your_cart_id",
        "userId": "your_user_id",
        "shop_order_ids": [
            {
                "shopId": "your_shop_id",
                "shop_discounts": [
                    {
                        "shopId": "your_shop_id",
                        "discountId": "your_discount_id",
                        "codeId": "your_code_id"
                    }
                ],
                "item_products": [
                    {
                        "price": "product_price",
                        "quantity": "product_quantity",
                        "productId": "your_product_id"
                    },
                    {
                        "price": "product_price",
                        "quantity": "product_quantity",
                        "productId": "your_product_id"
                    }
                ]
            }
        ]
    }
    
    */
    static async checkoutReview({ cartId, shopId, shop_order_ids }) {
        const foundCart = cartRepo.findidrtById(cartId)
        if (!foundCart) throw new BadRequestResponeError('Can not found cart')

        const check_order = {
            totalPrice: 0, //tong tien hang
            feeship: 0, //phí ship
            totalDiscount: 0,//tong tien discount
            totalCheckout: 0//tong tien thanh toan
        }, shop_order_ids_new = []

        for (i = 0; shop_order_ids.length(); i++) {
            const { shopId, shop_discount = [], item_product = [] } = shop_order_ids[i]
            // check product available
            const checkProductServer = await productRepo.checkProductByServer(item_product)
            console.log("🚀 ~ ~ checkProductServer:", checkProductServer)
            if (!checkProductServer[0]) throw new NotFoundResponeError('order wrong')
            //tong tien don hang
            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)
            //tong tien trc khi xu ly
            check_order.totalPrice = + checkoutPrice
            const itemCheckout = {
                shopId,
                shop_discount,
                priceRaw: checkoutPrice,//tien trc khi giam gia
                priceApplyDiscount: checkoutPrice,
                item_product: checkProductServer
            }
            // neu shop discount ton tai >0 check xem co hop le hay khong
            if (shop_discount.length > 0) {
                // gia su chi co 1 discount
                //get amount discount
                const { totalPrice = 0, discount = 0 } = await DiscountService.getDiscountAmount({
                    codeId: shop_discount.codeId,
                    userId,
                    shopId,
                    products: checkProductServer
                })
                //tong discount giam gia
                check_order.totalDiscount += discount
                //neu tien giam gai lon hon 0
                if (discount > 0) {
                    itemCheckout.priceApplyDiscount = checkoutPrice - discount
                }

            }
            //tong tien thanh toan cuoi cung
            check_order.totalCheckout += itemCheckout.priceApplyDiscount
            shop_order_ids_new.push(itemCheckout)


        }
        return {
            shop_order_ids,
            shop_order_ids_new,
            check_order
        }
    }
}
export default CheckoutService