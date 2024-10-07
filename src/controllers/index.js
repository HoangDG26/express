import { AuthController } from "./auth.js";
import CartController from "./cart.js";
import CheckOutController from "./checkout.js";
import DiscountController from "./discount.js";
import InventoryController from "./inventory.js";
import { ProductController } from "./product.js";

const ControllerModule = {
    AuthController,
    ProductController,
    DiscountController,
    CartController,
    CheckOutController,
    InventoryController
}

export default ControllerModule