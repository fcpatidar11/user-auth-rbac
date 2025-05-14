const messageConstant = require("@messages/load.message")

module.exports = {
    getMessageByCode: (messageCode, language) => {
        const messageValue = messageCode.split(".").reduce((acc, key) => acc?.[key], messageConstant[language] || {}) || messageCode;
        return messageCode.split(".").reduce((acc, key) => acc?.[key], messageConstant[language] || {}) || messageCode;
    }
}