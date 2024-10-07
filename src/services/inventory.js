import { NotFoundResponeError } from "../handle-response/error.response";
import inventoryModel from "../models/inventories";
import productRepo from "../models/repositories/product"

class InventoryService {
    static async addStockToInventory({
        stock,
        productId,
        shopId,
        location = '123, Cau Giay, Ha Noi city'
    }) {
        const product = await productRepo.getProductById(productId)
        if (!product) {
            throw new NotFoundResponeError("Product not exist");
        }
        const query = {
            inven_shopId: shopId,
            inven_productId: productId
        }, updateSet = {
            $inc: {
                inven_stock: stock,
            }, $set: {
                inven_location: location
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await inventoryModel.findOneAndUpdate(query, updateSet, options)
    }
}
export default InventoryService