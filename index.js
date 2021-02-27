// Load .env variables
require("dotenv").config();

const server = require("./server");
const stream = require("./stream");

stream.Start();
server.Listen(80);