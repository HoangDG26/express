import { unSelectData } from "../../utils/index.js"
import discountModel from "../discount.js"

const getAllDiscountUnSelect = async ({
    limit = 50,
    page = 1,
    sort = 'ctime',
    filter,
    unSelect,
    model }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };

    const documents = await model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unSelectData(unSelect))
        .lean();
    return documents;

}
const checkDiscontExist = async ({ model, filter }) => {
    return await model.findOne(filter).lean()
}
const discountRepo = { getAllDiscountUnSelect, checkDiscontExist }
export default discountRepo
