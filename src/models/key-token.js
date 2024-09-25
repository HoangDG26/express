import { model, Schema } from 'mongoose';
const DOCUMENT_NAME = 'key'
const COLLECTION_NAME = 'keys'
const keySchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    privateKey: { type: String, required: true, },
    publicKey: { type: String, required: true, },
    refreshToken: { type: Array, default: [], },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const keyModel = model(DOCUMENT_NAME, keySchema);

export default keyModel