import { BadRequestResponeError, NotFoundResponeError } from '../handle-response/error.response.js';
import productModel from '../models/products.js';
import invenRepo from '../models/repositories/iventory.js';
import productRepo from '../models/repositories/product.js';
import { removeUndefinedObject, updateNestedObjectParser } from '../utils/index.js';
class ProductService {

    static productRegistry = {}
    static registerProductType(type, classRef) {
        ProductService.productRegistry[type] = classRef
    }
    static async createProduct(type, payload) {
        const productClass = ProductService.productRegistry[type]
        if (!productClass) throw new BadRequestResponeError(`Invalid type: ${type}`)
        return new productClass(payload).createProduct()
    }
    static async updateProduct(type, product_id, payload) {
        const productClass = ProductService.productRegistry[type]
        if (!productClass) throw new BadRequestResponeError(`Invalid type: ${type}`)
        return new productClass(payload).updateProduct(product_id)
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
        return productRepo.publishProductByShop({ product_shop, product_id })

    }
    static async unPublishProductByShop({ product_shop, product_id }) {
        return productRepo.unPublishProductByShop({ product_shop, product_id })

    }
    //search thi k cần verify user
    static async searchProducts({ keySearch }) {
        return await productRepo.searchProducts({ keySearch })
    }
    //find all product
    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
        return await productRepo.findAllProducts({
            limit, sort, page, filter,
            select: ['product_name', 'product_price', 'product_thumb']

        })

    }
    /// find product by id
    static async findProductById({ product_id }) {
        return await productRepo.findProductById({
            product_id,
            unSelect: ['__v']

        })
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
        const newProduct = await productModel.product.create({
            ...this, _id: product_id
        })
        if (newProduct) {
            // thêm luôn vào hàng tồn kho
            await invenRepo.insertInvetory({
                productId: newProduct._id,
                userId: this.product_shop,
                stock: this.product_quantity
            })
        }
        return newProduct
    }
    // Update product by id
    async updateProduct(product_id, bodyUpdate) {
        return await productRepo.updateProductById({ product_id, bodyUpdate, model: productModel.product })
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

    /////////////////////
    async updateProduct(product_id) {
        /*1. remove nhung atrribute co gia gi null hoac undefined (có thể do truyền nhầm giá trị)- 
        remove trc để tránh replace nhầm trường có dữ liệu thành null*/
        const objectParams = removeUndefinedObject(this)
        //2. check xem update ở vị trí nào nêu update attributes thì phải update cha rồi lớp con
        if (objectParams.product_attributes) {
            //update thang con
            await productRepo.updateProductById({
                product_id,
                bodyUpdate: updateNestedObjectParser(objectParams.product_attributes),
                model: productModel.cloth
            })
        }
        //update thang cha
        const updateProduct = await super.updateProduct(product_id, updateNestedObjectParser(objectParams))

        return updateProduct
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