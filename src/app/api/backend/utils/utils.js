const checkReqBody = (body) => {
    const args = Array.prototype.slice.call(arguments, 1)
    for (let arg in args) {
        if (!(arg in body)) {
            return false
        }
    }
    return true
}

module.exports = { checkReqBody }