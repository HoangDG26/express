import { model, Schema, Types } from 'mongoose';
const DOCUMENT_NAME = 'cart'
const COLLECTION_NAME = "carts"

const cartSchema = new Schema({
    cart_state: {
        type: String, required: true,
        enum: ['active', 'completed', 'fail', 'pendings'],
        default: 'active'
    },
    cart_products: { type: Array, required: true, default: [] },
    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: Array, required: true }

}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const cartModel = model(DOCUMENT_NAME, cartSchema);

export default cartModel