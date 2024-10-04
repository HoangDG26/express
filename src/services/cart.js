/*
1.add product to cart
2.reduce product
3.increase product quantity by one 
4.get cart
5.delete cart
6.delete cart item

*/
import { NotFoundResponeError } from "../handle-response/error.response.js"
import cartModel from "../models/cart.js"
import productRepo from "../models/repositories/product.js"

class CartService {
    static async createCart({ userId, product }) {
        const query = { cart_userId: userId, cart_state: 'active' },
            updateOrInsert = { $addToSet: { cart_products: product } },
            options = { upsert: true, new: true }
        return cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }
    static async addToCart({ userId, product = {} }) {
        const userCart = await cartModel.findOne({ cart_userId: userId })
        //chua co gio hang
        if (!userCart) {
            return this.createCart({ userId, product })
        }
        //co gia hang nhng chua co san pham
        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return await userCart.save()
        }
        //co gio hang va ton tai san pham thi update quantity
        return await this.updateCartUserQuanity({ userId, product })
    }
    //update giá trị quantity trong giỏ hang
    /*
    
           shop_order_ids:{
                shopId,
                item_products:[{
                    quantity,
                    price,
                    old_quantity,
                    productId
                }],version
             }
    */
    static async addToCartV2({ userId, shop_order_ids }) {
        const { productId, quantity, old_quantity } = shop_order_ids.item_products[0]
        const found_product = await productRepo.getProductById(productId)
        if (!found_product)
            throw new NotFoundResponeError('[1]Not found product')

        if (found_product.product_shop.toString() !== shop_order_ids.shopId)
            throw new NotFoundResponeError('[2]Not found product')
        if (quantity === 0) { }
        return await this.updateCartUserQuanity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity
            }
        })
    }
    static async updateCartUserQuanity({ userId, product }) {
        const { productId, quantity } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateOrInsert = {
            $inc: {
                'cart_products.$.quantity': quantity
            },
        }, options = { upsert: true, new: true }

        return cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }
    static async deleteCart({ userId, productId }) {
        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId
                    }
                }
            }
        const deletecart = await cartModel.updateOne(query, updateSet)
        return deletecart

    }
    static async getListUserCart({ userId }) {
        console.log("🚀 ~ CartService ~ getListUserCart ~ userId:", userId)
        return await cartModel.findOne({
            cart_userId: +userId
        }).lean()
    }
}

export default CartService