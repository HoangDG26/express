import { NotFoundResponeError } from "../handle-response/error.response.js"
import commentModel from "../models/comment.js"
import productRepo from "../models/repositories/product.js"

class CommentService {

    /*
    add comment 
    get list
    delete
    */
    static async creatComment({
        productId,
        userId,
        content,
        parentCommentId = null
    }) {
        const comment = new commentModel({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parenId: parentCommentId
        })

        let rightValue
        if (parentCommentId) {
            //reply comment 
            const parentComment = await commentModel.findById(parentCommentId)
            if (!parentComment) {
                throw new NotFoundResponeError(`Not found comment`)
            }
            rightValue = parentComment.comment_right
            const r = await commentModel.updateMany({
                comment_productId: productId,
                comment_right: {
                    $gte: rightValue,

                }
            }, {
                $inc: { comment_right: 2 }
            }
            )

            await commentModel.updateMany({
                comment_productId: productId,
                comment_left: {
                    $gt: rightValue,

                }
            }, {
                $inc: { comment_left: 2 }
            }
            )
        } else {
            const maxRightValue = await commentModel.findOne(
                { comment_productId: productId, },
                'comment_right',
                { sort: { comment_right: -1 } }
            )
            if (maxRightValue) {
                rightValue = maxRightValue.right + 1
            } else {
                rightValue = 1
            }
        }
        //insert 
        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1

        await comment.save()
        return comment
    }
    static async getCommentsByParentId({
        productId,
        parentCommentId,
        limit = 50,
        offset = 0//skipp
    }) {
        if (parentCommentId) {
            const parentComment = await commentModel.findById(parentCommentId)
            if (!parentComment) {
                throw new NotFoundResponeError(`Not found parent`)
            }
            const comments = await commentModel.find({
                comment_productId: productId,
                comment_left: { $gt: parentComment.comment_left },
                comment_right: { $lte: parentComment.comment_right },
            }).select({
                comment_left: 1,
                comment_right: 1,
                comment_content: 1,
                comment_parenId: 1,
            }).sort({
                comment_left: 1
            })
            return comments
        }
        const comments = await commentModel.find({
            comment_productId: productId,
            comment_parenId: parentCommentId
        }).select({
            comment_left: 1,
            comment_right: 1,
            comment_content: 1,
            comment_parenId: 1,
        }).sort({
            comment_left: 1
        })
        return comments
    }
    static async deleteComment({
        commentId,
        productId
    }) {
        const founfProduct = await productRepo.getProductById(productId)
        if (!founfProduct) {
            throw new NotFoundResponeError('Not found product')
        }
        //xac định giá trị trái phải của comment ID
        const foundComment = await commentModel.findById(commentId)
        if (!foundComment) {
            throw new NotFoundResponeError('Not found comment')
        }
        const leftValue = foundComment.comment_left
        const rightValue = foundComment.comment_right
        const withValue = rightValue - leftValue + 1

        await commentModel.deleteMany({
            comment_productId: productId,
            comment_left: { $gte: leftValue, $lte: rightValue }
        })
        await commentModel.updateMany({
            comment_productId: productId,
            comment_right: { $gt: rightValue }
        }, {
            $inc: { comment_right: - withValue }
        }
        )
        await commentModel.updateMany({
            comment_productId: productId,
            comment_left: { $gt: rightValue }
        }, {
            $inc: { comment_right: - withValue }
        }
        )
        return true
    }
}

export default CommentService