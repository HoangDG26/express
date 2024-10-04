import cartModel from "../cart.js"

const findidrtById = async (cartId) => {
    return await cartModel.findOne({ _id: cartId, cart_state: 'active' }).lean()
}
const cartRepo = { findidrtById }
export default cartRepo