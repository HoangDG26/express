import cartModel from "../cart.js"

const findCartById = async (cartId) => {
    return await cartModel.findOne({ _id: cartId, cart_state: 'active' }).lean()
}
const cartRepo = { findCartById }
export default cartRepo