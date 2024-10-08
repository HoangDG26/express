import { model, Schema, Types } from 'mongoose';
const DOCUMENT_NAME = 'comment'
const COLLECTION_NAME = "comments"

const commentSchema = new Schema({
    comment_productId: { type: Schema.Types.ObjectId, ref: 'product' },
    comment_userId: { type: Number, default: 1 },
    comment_content: { type: String, default: 'text' },
    comment_left: { type: Number, default: 0 },
    comment_right: { type: Number, default: 0 },
    comment_parenId: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME },
    is_deleted: { type: Boolean, default: false }

}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    },
    collection: COLLECTION_NAME,
}


);
const commentModel = model(DOCUMENT_NAME, commentSchema);

export default commentModel