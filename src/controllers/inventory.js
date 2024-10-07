import { CreatedSuccess } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class InventoryController {
    static addStocktoInventory = async (req, res, next) => {
        new CreatedSuccess({
            message: 'Add stock to Inventory successfull',
            metadata: await ServiceModule.InventoryService.addStockToInventory({
                ...req.body,
            })
        }).sendResponse(res)
    }

}
export default InventoryController