const messageConstant = require("@messages/load.message")

module.exports = {
    getMessageByCode: (messageCode, language) => {
        return messageCode.split(".").reduce((acc, key) => acc?.[key], messageConstant[language] || {});
    }
}