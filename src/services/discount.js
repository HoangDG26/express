import { BadRequestResponeError, NotFoundResponeError } from "../handle-response/error.response.js"
import discountModel from "../models/discount.js"
import discountRepo from "../models/repositories/discount.js"
import productRepo from "../models/repositories/product.js"
import { unSelectData } from "../utils/index.js"


/*
Discount Service
1-Generator discount code [shop|admin]
2-Get discount amount[user]
3-Get all discount codes [user|shop]
4-Verify discount code [user]
5-Delete discount code [admin|shop]
6-Cancel discount code [user] 
*/
class DiscountService {
    static async createDiscountCode(payload) {
        const {
            name,
            description,
            type,
            value,
            code,
            start_date,
            end_date,
            max_uses,
            uses_count,
            users_used,
            max_uses_per_user,
            min_order_value,
            shopId,
            is_active,
            applies_to,
            product_ids
        } = payload

        // if (new Date < new Date(start_date) || new Date > new Date(end_date))
        //     throw new BadRequestResponeError('Discount code experied')
        if (new Date(start_date) >= new Date(end_date))
            throw new BadRequestResponeError('Start date must be before end date')

        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shopId: shopId
        }).lean()
        if (foundDiscount && foundDiscount.discount_is_active)
            throw new BadRequestResponeError('Discount exsist')

        const newDiscount = await discountModel.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses_per_user: max_uses_per_user,
            distcount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        })
        return newDiscount
    }
    static async updateDiscountCode() {

    }
    //Shop id là id của user login 
    static async getAllDiscountCodeWithProduct({ code, shopId, userId, limit, page }) {
        console.log("🚀 ~ DiscountService ~ getAllDiscountCodeWithProduct ~ shopId:", shopId)
        console.log("🚀 ~ DiscountService ~ getAllDiscountCodeWithProduct ~ code:", code)

        const foundDiscount = await discountModel.findOne({
            discount_code: code,
            discount_shopId: shopId
        }).lean()
        if (!foundDiscount || !foundDiscount.discount_is_active)
            throw new NotFoundResponeError('Discount not exsist')

        const { discount_applies_to, discount_product_ids } = foundDiscount
        let products
        if (discount_applies_to === 'all') {
            products = await productRepo.findAllProducts({
                filter: {
                    product_shop: shopId,
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })


        } if (discount_applies_to === 'specific') {
            products = await productRepo.findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }
        return products

    }

    static async getAllDiscountCodeByShop({ limit, page, shopId }) {
        const discounts = await discountRepo.getAllDiscountUnSelect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: shopId,
                discount_is_active: true
            },
            unSelect: ['__v', 'discount_shopId'],
            model: discountModel
        })
        return discounts
    }
    static async getDiscountAmount({ codeId, userId, shopId, products }) {
        const foundDiscount = await discountRepo.checkDiscontExist({
            filter: {
                discount_shopId: shopId,
                discount_code: codeId
            },
            model: discountModel
        });
        if (!foundDiscount) throw new NotFoundResponeError('Discount not found')
        const {
            discount_is_active,
            discount_max_uses,
            discount_min_order_value,
            discount_users_used,
            discount_type,
            discount_max_uses_per_user,
            discount_value
        } = foundDiscount
        if (!discount_is_active) throw new NotFoundResponeError('Discount expried')
        if (!discount_max_uses) throw new NotFoundResponeError('Discount are out')

        let totalOrder = 0;
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, product) => {
                const hihi = acc + (product.quantity * product.price)
                return hihi
            }, 0)
            if (totalOrder < discount_min_order_value) {
                throw new NotFoundResponeError(`Discount requires a minium order value of ${discount_min_order_value}`)
            }

        }
        if (discount_max_uses_per_user > 0) {
            const userUserDiscount = discount_users_used.find(user => user.userId === userId)
            if (userUserDiscount) {
                //.....
            }
        }
        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100)
        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }
    static async deleteDiscountcode() {
        const deleteDiscount = await discountModel.findByIdAndDelete({
            discount_shopId: shopId,
            discount_code: codeId
        })
        return deleteDiscount
    }
    static async cancelDiscountCode({ codeId, shopId, userId }) {
        const foundDiscount = await discountRepo.checkDiscontExist({
            filter: {
                discount_shop: shopId
                , discount_code: code

            },
            model: discountModel
        })
        if (!foundDiscount) throw new NotFoundResponeError('Discount not found')
        const results = await discountModel.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userid
            },
            $inc: {
                distcount_max_uses: 1,
                discount_users_used: -1,

            }
        })
        return results
    }

}
export default DiscountService