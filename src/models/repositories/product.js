
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
    // Thay vì tạo regex, hãy sử dụng keySearch trực tiếp cho $search
    const results = await productModel.product.find(
        {
            isDraft: false,
            $text: { $search: keySearch }  // Sử dụng keySearch thay vì regex
        },
        {
            score: { $meta: 'textScore' }  // Sửa lại để lấy score đúng cách
        }
    )
        .sort({ score: { $meta: 'textScore' } }) // Sửa lại để lấy score đúng cách
        .lean();

    return results;
}

const productRepo = {
    findAdllDraft,
    publishProductByShop,
    findAdllPublished,
    unPublishProductByShop,
    searchProducts
}
export default productRepo