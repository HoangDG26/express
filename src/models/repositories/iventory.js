import inventoryModel from "../inventories.js"

const insertInvetory = async ({
    productId,
    userId,
    stock,
    location = 'unknown'
}) => {
    return await inventoryModel.create({
        iven_productId: productId,
        iven_shopId: userId,
        iven_stock: stock,
        iven_location: location,

    })
}
const invenRepo = { insertInvetory }
export default invenRepo