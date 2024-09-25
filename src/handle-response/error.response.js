const STATUS_CODE = {
    BADREQUEST: 403,
    CONFLICT: 409
}
const REASION_CODE = {
    BADREQUEST: 'Bad request',
    CONFLICT: 'Conlict error'
}
class ErrorResonse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
class ConfictResponeError extends ErrorResonse {
    constructor(message = REASION_CODE.CONFLICT, statusCode = STATUS_CODE.CONFLICT) {
        super(message)
        this.status = statusCode
    }
}
class BadRequestResponeError extends ErrorResonse {
    constructor(message = BADREQUEST, statusCode = STATUS_CODE.BADREQUEST) {
        super(message)
        this.status = statusCode
    }
}



export {
    ConfictResponeError,
    BadRequestResponeError
}