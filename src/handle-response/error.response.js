import { ReasonPhrases, StatusCodes } from "http-status-codes"

// const STATUS_CODE = {
//     BAD_REQUEST: 400,
//     NOT_FOUND: 404,
//     FORBIDDEN: 403,
//     UNAUTHORIZED: 401,
//     CONFLICT: 409
// }
// const REASON_CODE = {
//     BAD_REQUEST: 'Bad request Error',
//     NOT_FOUND: 'Cannot Found Error',
//     FORBIDDEN: 'Forbidden Error',
//     UNAUTHORIZED: 'Unauthorized Error',
//     CONFLICT: 'Conlict Error'
// }

class ErrorResonse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}
//conflict err
class ConfictResponeError extends ErrorResonse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statusCode = StatusCodes.CONFLICT) {
        super(message)
        this.status = statusCode
    }
}
//bad request err
class BadRequestResponeError extends ErrorResonse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        statusCode = StatusCodes.BAD_REQUEST) {
        super(message)
        this.status = statusCode
    }
}
//not found
class NotFoundResponeError extends ErrorResonse {
    constructor(
        message = ReasonPhrases.NOT_FOUND,
        statusCode = StatusCodes.NOT_FOUND) {
        super(message)
        this.status = statusCode
    }
}
//unauthorized
class UnauthorizedResponeError extends ErrorResonse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        statusCode = StatusCodes.UNAUTHORIZED) {
        super(message)
        this.status = statusCode
    }
}
//forbidden

class ForbiddenResponeError extends ErrorResonse {
    constructor(
        message = ReasonPhrases.FORBIDDEN,
        statusCode = StatusCodes.FORBIDDEN) {
        super(message)
        this.status = statusCode
    }
}
//class FailAuthRepsone extends ErrorResonse{}

export {
    ConfictResponeError,
    BadRequestResponeError,
    NotFoundResponeError,
    UnauthorizedResponeError,
    ForbiddenResponeError
}