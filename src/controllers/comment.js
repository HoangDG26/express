import { CreatedSuccess } from "../handle-response/sucess.response.js"
import ServiceModule from "../services/index.js"

class CommentController {
    static createComment = async (req, res, next) => {
        new CreatedSuccess({
            message: 'comment successfull',
            metadata: await ServiceModule.CommentService.creatComment(req.body)
        }).sendResponse(res)
    }
    static getCommentsByParentId = async (req, res, next) => {
        new CreatedSuccess({
            message: 'get comment successfull',
            metadata: await ServiceModule.CommentService.getCommentsByParentId(req.query)
        }).sendResponse(res)
    }
    static deleteComment = async (req, res, next) => {
        new CreatedSuccess({
            message: 'get comment successfull',
            metadata: await ServiceModule.CommentService.deleteComment(req.body)
        }).sendResponse(res)
    }
}
export default CommentController