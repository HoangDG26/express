import { model, Schema } from 'mongoose';
const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = "products"
// điểm chung của product
const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_type: { type: String, required: true, enum: ['Electronics', 'Clothes', 'Furniture'] },
    product_quantity: { type: Number, required: true, },
    product_price: { type: Number, required: true, },
    product_shop: { type: Schema.Types.ObjectId, ref: 'user' },
    product_attributes: { type: Schema.Types.Mixed, required: true, },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
//define clothes schema
const clothSchema = new Schema({
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true,
    collection: 'clothes',
});
const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String },
    color: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true,
    collection: 'electronics',
});
const furnitureSchema = new Schema({
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true,
    collection: 'furnitures',
});
const productModel = {
    product: model(DOCUMENT_NAME, productSchema),
    cloth: model('_cloth', clothSchema),
    electronic: model('_elctronic', electronicSchema),
    furniture: model('_furnitureSchema', furnitureSchema)

}

export default productModel