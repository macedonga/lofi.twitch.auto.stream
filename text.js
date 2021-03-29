const fs = require("fs");

module.exports.ChangeText = (text) => {
    try {
        fs.writeFileSync("./assets/livetext.txt", text);
    } catch { }
};