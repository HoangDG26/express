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
const reservationInventory = async ({ productId, quantity, cartId }) => {
    const query = {
        inven_productId: productId,
        inven_stock: { $gte: quantity }
    }, updateSet = {
        $inc: { inven_stock: - quantity },
        $push: {
            inven_reservations: {
                quantity,
                cartId,
                createOnl: new Date()
            }
        }
    }.options = { upsert: true, new: true }
    return await inventoryModel.updateMany(query, updateSet)
}
const invenRepo = { insertInvetory, reservationInventory }
export default invenRepo