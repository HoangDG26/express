import { model, Schema, Types } from 'mongoose';
const DOCUMENT_NAME = 'discount'
const COLLECTION_NAME = "discounts"

const discountSchema = new Schema({
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: 'fixed_amount' },// hoặc là percentage,
    discount_vallue: { type: Number, required: true },
    discount_code: { type: String, required: true },//voucher
    discount_start_date: { type: Date, required: true },//ngay bat dau
    discount_end_date: { type: Date, required: true },//ngay ket thuc
    distcount_max_uses: { type: Number, required: true },//so luong disscount duoc ap dung
    discount_uses_count: { type: Number, required: true },//so discount da su dung
    discount_users_used: { type: Array, default: [] },//ai su dung
    discount_max_uses_per_user: { type: Number, required: true },// so luong toi da cho 1 nguoi
    discount_min_order_value: { type: Number, required: true },// so luong toi da cho 1 nguoi
    discount_shopId: { type: Schema.Types.ObjectId, ref: 'user' },
    discount_is_active: { type: Boolean, default: true },
    discount_applies_to: { type: String, required: true, enum: ['all', 'specific'] },
    discount_product_ids: { type: Array, default: [] }//so san pham dc ap dung
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const discountModel = model(DOCUMENT_NAME, discountSchema);

export default discountModel