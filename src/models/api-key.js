import { model, Schema } from 'mongoose';
const DOCUMENT_NAME = 'api-key'
const COLLECTION_NAME = 'api-keys'
const apiKeySchema = new Schema({
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true, },
    permissions: { type: [String], required: true, enum: ['0000', '1111', '2222'] },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const apiKeyModel = model(DOCUMENT_NAME, apiKeySchema);

export default apiKeyModel