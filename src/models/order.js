import { model, Schema } from 'mongoose';
const DOCUMENT_NAME = 'order'
const COLLECTION_NAME = 'orders'
const orderSchema = new Schema({
    order_userId: { type: Number, required: true },
    order_checkout: { type: Object, default: {} },
    /*
    order checkout ={
    totalPrice,
    totalApplyDiscount,
    feeship
    }
    */
    order_shipping: { type: Object, default: {} },
    /*
    street,
    city,
    state,
    country
    */
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, required: true, },
    order_trackingNumber: { type: String, enum: ['pending', 'confirm', 'shipped', 'canceled', 'delivered'], default: 'pending' },

}, {

    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    },
    collection: COLLECTION_NAME,
}


);
const orderModel = model(DOCUMENT_NAME, orderSchema);

export default orderModel