// Load .env variables
require("dotenv").config();

const server = require("./server");
const stream = require("./stream");
const text = require("./text");
const radio = require("radio-stream");

var rstream = radio.createReadStream("https://hyades.shoutca.st:8043/stream");
rstream.on("connect", function () {
    console.log("Radio Stream connected!");
});

rstream.on("metadata", function (title) {
    title = title.replace("StreamTitle='", "").replace("';", "");
    title = title.replace("Unknown - ", "").replace("- Unknown", "");
    if (title == "support chillsky - support chillsky")
        title = "Music provided by Chillsky";

    text.ChangeText(title);
});

stream.Start();
server.Listen(process.env.PORT || 80);