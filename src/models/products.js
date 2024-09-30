import { model, Schema } from "mongoose";
import slugify from "slugify";
const DOCUMENT_NAME = "product";
const COLLECTION_NAME = "products";
// điểm chung của product
const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_slug: { type: String }, //vi du : do-gia-hoang
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothes", "Furniture"],
    },
    product_quantity: { type: Number, required: true },
    product_price: { type: Number, required: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "user" },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { typr: String, defaul: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false }, //select : false la khi find hoac findOne.... se khong dc lay ra
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
//Middleware for slug before save data
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

// đánh index để search 
productSchema.index({ product_name: 'text', product_description: 'text' })

//define clothes schema
const clothSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    collection: "clothes",
  }
);
const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String },
    color: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    collection: "electronics",
  }
);
const furnitureSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String },
    product_shop: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    collection: "furnitures",
  }
);
const productModel = {
  product: model(DOCUMENT_NAME, productSchema),
  cloth: model("_cloth", clothSchema),
  electronic: model("_elctronic", electronicSchema),
  furniture: model("_furnitureSchema", furnitureSchema),
};

export default productModel;
