
import mongoose from 'mongoose'
import { getSelectData, unSelectData } from '../../utils/index.js'
import productModel from '../products.js'

const findAdllDraft = async ({ query, limit, skip }) => {
    return queryProduct({ query, limit, skip })
}
////////////
const findAdllPublished = async ({ query, limit, skip }) => {
    return queryProduct({ query, limit, skip })
}
//////////////
const queryProduct = async ({ query, limit, skip }) => {
    return await productModel.product.find(query)
        .populate('product_shop', 'name email -_id')// "-" là loại bỏ sự xuất hiện của trường khi lấy ra ví dụ ở đây là id
        .sort({ updateAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}
//////////////
const publishProductByShop = async ({ product_shop, product_id }) => {
    const found_shop = await productModel.product.findOne({
        product_shop: product_shop,
        _id: product_id
    })
    if (!found_shop) return null
    found_shop.isDraft = false
    found_shop.isPublished = true
    const { modifiedCount } = await found_shop.updateOne(found_shop)
    return modifiedCount
}
////////////////
const unPublishProductByShop = async ({ product_shop, product_id }) => {
    const found_shop = await productModel.product.findOne({
        product_shop: product_shop,
        _id: product_id
    })
    if (!found_shop) return null
    found_shop.isDraft = true
    found_shop.isPublished = false
    const { modifiedCount } = await found_shop.updateOne(found_shop)
    return modifiedCount
}
////////////////
const searchProducts = async ({ keySearch }) => {
    const results = await productModel.product.find(
        {
            isDraft: false,
            $text: { $search: keySearch }
        },
        {
            score: { $meta: 'textScore' }
        }
    )
        .sort({ score: { $meta: 'textScore' } })
        .lean();

    return results;
}
////////////////
const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await productModel.product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    return products

}
////////////////
const findProductById = async ({ product_id, unSelect }) => {
    const product = await productModel.product.findById({ _id: product_id })
        .select(unSelectData(unSelect))
    return product

}
////////////////
const updateProductById = async ({ product_id, bodyUpdate, model, isNew = true }) => {
    const product = await model.findByIdAndUpdate(
        product_id,
        bodyUpdate,
        { new: isNew }
    )
    return product

}
const getProductById = async (productId) => {
    const product = await productModel.product.findOne({ _id: productId }).lean()
    return product
}
const checkProductByServer = async (products) => {
    return await Promise.all(products.map(async product => {
        const foundProduct = await getProductById(product.productId)
        console.log("🚀 ~ checkProductByServer ~ foundProduct:", foundProduct)
        if (foundProduct)
            return {
                price: foundProduct.product_price,
                quantity: product.quantity,
                productId: product.productId
            }
    }))
}

const productRepo = {
    findAdllDraft,
    publishProductByShop,
    findAdllPublished,
    unPublishProductByShop,
    searchProducts,
    findAllProducts,
    findProductById,
    updateProductById,
    getProductById,
    checkProductByServer,
}
export default productRepo