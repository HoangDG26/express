import { BadRequestResponeError, NotFoundResponeError } from '../handle-response/error.response.js';
import productModel from '../models/products.js';
import productRepo from '../models/repositories/product.js';
class ProductService {

    static productRegistry = {}
    static registerProductType(type, classRef) {
        ProductService.productRegistry[type] = classRef
    }
    static async createProduct(type, payload) {
        console.log('sdsdsdsdsdsd: ', payload)
        const productClass = ProductService.productRegistry[type]
        if (!productClass) throw new BadRequestResponeError(`Invalid type: ${type}`)
        return new productClass(payload).createProduct()
    }
    // lấy tất cả record là bản nháp khi isDraft = true
    static async findAdllDraft({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await productRepo.findAdllDraft({ query, skip, limit })
    }
    // lấy tất cả record là bản nháp khi isPublish = true
    static async findAdllPublished({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true }
        console.log("🚀 ~ ProductService ~ findAdllPublished :", await productRepo.findAdllPublished({ query, skip, limit }))
        return await productRepo.findAdllPublished({ query, skip, limit })
    }
    // xuẩt bản các bản nháp ra
    // dùng đầu PUT
    static async publishProductByShop({ product_shop, product_id }) {
        console.log("🚀 ~ ProductService ~ publishProductByShop ~ product_id:", product_id)
        return productRepo.publishProductByShop({ product_shop, product_id })

    }
    static async unPublishProductByShop({ product_shop, product_id }) {
        console.log("🚀 ~ ProductService ~ publishProductByShop ~ product_id:", product_id)
        return productRepo.unPublishProductByShop({ product_shop, product_id })

    }
    //search thif k cần verify user
    static async searchProducts({ keySearch }) {
        return await productRepo.searchProducts({ keySearch })
    }
}
class Product {
    constructor({ product_name, product_thumb, product_description, product_type,
        product_quantity, product_price, product_shop, product_attributes
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_type = product_type
        this.product_quantity = product_quantity
        this.product_price = product_price
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }
    //create new product
    async createProduct(product_id) {
        return await productModel.product.create({
            ...this, _id: product_id
        })
    }
}
//sub-class
class Clothes extends Product {
    async createProduct() {
        const newCloth = await productModel.cloth.create(
            {
                ... this.product_attributes,
                product_shop: this.product_shop

            }
        )/// kiêu mix của attribute cho tạo các trường khác còn lại
        if (!newCloth) throw new NotFoundResponeError('Create new cloth error')
        const newProduct = super.createProduct()
        if (!newProduct) throw new NotFoundResponeError('[1]Create new product error')
        return newProduct
    }
}
class Electronics extends Product {
    async createProduct() {
        const newElectronic = await productModel.electronic.create({
            ... this.product_attributes,
            product_shop: this.product_shop
        })/// kiêu mix của attribute cho tạo các trường khác còn lại
        if (!newElectronic) throw new NotFoundResponeError('Create new electronic error')
        const newProduct = super.createProduct(newElectronic._id)
        if (!newProduct) throw new NotFoundResponeError('[2]Create new product error')
        return newProduct
    }
}
class Furniture extends Product {
    async createProduct() {
        const newFurniture = await productModel.furniture.create({
            ... this.product_attributes,
            product_shop: this.product_shop
        })/// kiêu mix của attribute cho tạo các trường khác còn lại
        if (!newFurniture) throw new NotFoundResponeError('Create new electronic error')
        const newProduct = super.createProduct(newFurniture._id)
        if (!newProduct) throw new NotFoundResponeError('[2]Create new product error')
        return newProduct
    }
}

ProductService.registerProductType('Clothes', Clothes)
ProductService.registerProductType('Electronics', Electronics)
ProductService.registerProductType('Furniture', Furniture)
export default ProductService