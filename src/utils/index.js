import _ from 'lodash'

const getInforData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}
//['a','b'] => {a:1,b:1}
const getSelectData = (select = []) => {
    const obj = Object.fromEntries(select.map(el => [el, 1]))
    return obj
}
//['a','b'] => {a:0,b:0}
const unSelectData = (select = []) => {
    const obj = Object.fromEntries(select.map(el => [el, 0]))
    return obj
}
const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}
const updateNestedObjectParser = obj => {
    const final = {}
    Object.keys(obj || {}).forEach(
        k => {
            if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
                const response = updateNestedObjectParser(obj[k])
                Object.keys(response).forEach(a => {
                    final[`${k}.${a}`] = response[a]
                })
            } else {
                final[k] = obj[k]
            }
        }
    )
    return final
}
export {
    getInforData,
    getSelectData,
    unSelectData,
    removeUndefinedObject,
    updateNestedObjectParser
}