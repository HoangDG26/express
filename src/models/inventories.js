import { model, Schema, Types } from 'mongoose';
const DOCUMENT_NAME = 'inventoiry'
const COLLECTION_NAME = "inventories"

const inventorySchema = new Schema({
    iven_productId: { type: Schema.Types.ObjectId, ref: 'product' },

    iven_location: { type: String, default: 'unknown', },
    iven_stock: { type: Number, required: true },
    iven_shopId: { type: Schema.Types.ObjectId, ref: 'user' },
    iven_reservations: { type: Array, default: [] },

}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const inventoryModel = model(DOCUMENT_NAME, inventorySchema);

export default inventoryModel