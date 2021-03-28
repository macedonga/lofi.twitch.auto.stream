const fs = require("fs");

const PHRASES = [
    "Follow me on Twitter @_macedonga_!",
    "Follow me on GitHub @macedonga!",
    "Check out my website! https://macedon.ga",
    "Check out my latest project! https://noice.link"
];

const rnd = (arr) => { return arr[Math.floor(Math.random() * arr.length)] };

setInterval(() => {
    var randomText = rnd(PHRASES);
    try {
        const readData = fs.readFileSync("./assets/livetext.txt.tmp", "utf8");
        fs.writeFileSync("./assets/livetext.txt.tmp", randomText);
        fs.writeFileSync("./assets/livetext.txt", readData == "START" ? randomText : readData);
    } catch { }
}, 13000);