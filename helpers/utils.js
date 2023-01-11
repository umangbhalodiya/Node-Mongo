const crypto = require("crypto");
const messages = require("../helpers/constants/message");
const key = "06f3gk1185gzc70f6ucee1jua1714t7d78gplufaxz4ff0qw";
const algorithm = "aes-256-ctr";

const generateUUID = (length = 6, options = { numericOnly: false }) => {
    let text = "";
    const possible =
        options && options.numericOnly
            ? "0123456789"
            : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
};

// const decrypt = (text) => {
//     const decipher = crypto.createCipher(algorithm, key);
//     let dec = decipher.update(text, "hex", "utf8");
//     dec += decipher.final("utf8");
//     return dec;
// };

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
};

module.exports = {
    messages,
    generateUUID,
    onlyUnique,
    encrypt,
    // decrypt,
};
