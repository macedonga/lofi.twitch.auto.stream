// Load .env variables
require("dotenv").config();

const server = require("./server");
const stream = require("./stream");
const text = require("./text");

stream.Start();
server.Listen(process.env.PORT || 80);