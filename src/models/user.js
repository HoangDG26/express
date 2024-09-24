import { model, Schema, Types } from 'mongoose';
const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = "users"
export const USER_ROLE = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}
const userSchema = new Schema({
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, maxLength: 150, unique: true, },
    // phone: { type: String, unique: true, },
    password: { type: String, required: true, },
    status: { type: String, enum: ['active', 'inactive',], default: 'inactive', },
    verify: { type: Schema.Types.Boolean, default: false, },
    roles: { type: Array, default: USER_ROLE.USER, },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
}


);
const userModel = model(DOCUMENT_NAME, userSchema);

export default userModel