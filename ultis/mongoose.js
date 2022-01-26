module.exports = {
    multiple: function (arr) {
        return arr.map(item => item.toObject());
    },
    one: mongooseObject => mongooseObject.toObject()
}