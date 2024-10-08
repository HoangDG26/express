import { BadRequestResponeError, NotFoundResponeError } from "../handle-response/error.response.js"
import orderModel from "../models/order.js"
import cartRepo from "../models/repositories/cart.js"
import productRepo from "../models/repositories/product.js"
import DiscountService from "./discount.js"
import redisService from "./redis.js"



class CheckoutService {
    /*
    
       {
        "cartId": "your_cart_id",
        "userId": "your_user_id",
        "shop_order_ids": [
            {
                "shopId": "your_shop_id",
                "shop_discount": [
                    {
                        "shopId": "your_shop_id",
                        "discountId": "your_discount_id",
                        "codeId": "your_code_id"
                    }
                ],
                "item_product": [
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
    static async checkoutReview({ cartId, userId, shop_order_ids }) {
        const foundCart = await cartRepo.findCartById(cartId)
        if (!foundCart) throw new BadRequestResponeError('Can not found cart')

        const check_order = {
            totalPrice: 0, //tong tien hang
            feeship: 0, //phí ship
            totalDiscount: 0,//tong tien discount
            totalCheckout: 0//tong tien thanh toan
        }, shop_order_ids_new = []

        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shopId, shop_discount = [], item_product = [] } = shop_order_ids[i]
            // check product available
            const checkProductServer = await productRepo.checkProductByServer(item_product)
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
                const { totalPrice = 0, discount = 0 } = await DiscountService.getDiscountAmount({
                    codeId: shop_discount[0].codeId,
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
    //order
    static async orderByUser({
        shop_order_ids,
        cartId,
        userId,
        user_address = {},
        user_payment = {},

    }) {
        const { shop_order_ids_new, checkout_order } = await CheckoutService.checkoutReview({
            cartId,
            userId,
            shop_order_ids
        })
        // cheq lai xem vuot tin kho hay khong 
        // get new array
        const products = shop_order_ids_new.flashMap(order.item_product)
        const acquireProduct = []
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i];
            const keyLock = await redisService.acquirelock({ productId, quantity, cartId })
            acquireProduct.push(keyLock ? true : false)
            if (keyLock)
                await redisService.releaseLock(keyLock)
        }
        if (acquireProduct.includes(false)) {
            throw new BadRequestResponeError("Một số sản phẩm đã được cập nhật , vui lòng quay lại giỏ hàng....")
        }
        const newOrder = await orderModel.create({
            order_userId: userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products: shop_order_ids_new
        })
        //trường họp nếu insert thành công  thì remove product trong giỏ hàng (cart)
        if (newOrder) {
            //remove product in cart
        }
        return newOrder
    }

    static async getOrdersByUser() {
        //................
    }
    static async geOnetOrderByUser() {
        //................
    }
    static async cancelOrderByUser() {
        //................
    }
    static async updateOrderByUser() {
        //................
    }
}
export default CheckoutService
// const array = [1, 2, 3, 4, 5, 55, 4, 3]
// const af = array.includes(5, 6)
// console.log("🚀 ~ array:", array)
// console.log("🚀 ~ af:", af)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

let txt = "";
for (let x in numbers) {
    txt += numbers[x];
}
console.log("🚀 ~ txt:", txt)
const cars = ["BMW", "Volvo", "Mini"];

let text = "";
for (let x of cars) {
    text += x;
}
console.log("🚀 ~ text[2]:", text)