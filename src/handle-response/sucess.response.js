// const STATUS_CODE = {
//     OK: 200,
//     CREATED: 201,
// }
// const REASON_CODE = {
//     OK: 'Success',
//     CREATED: 'Create Success',
// }
import { ReasonPhrases, StatusCodes } from "http-status-codes"
class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonCode = ReasonPhrases.OK,
        metadata = {}
    }) {
        this.message = !message ? reasonCode : message
        this.status = statusCode,
            this.metadata = metadata
    }
    sendResponse(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}
class Success extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata })
    }
}
class CreatedSuccess extends SuccessResponse {
    constructor({
        //options={}  ví dụ thêm options để phân trang
        message,
        statusCode = StatusCodes.CREATED,
        reasonCode = ReasonPhrases.CREATED,
        metadata
    }) {
        super({ message, statusCode, reasonCode, metadata })
        // this.options
    }
}
export { Success, CreatedSuccess }