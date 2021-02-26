// Load .env variables
require("dotenv").config();

// Requirements
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const axios = require("axios");

ffmpeg.setFfmpegPath(ffmpegPath);

const GetIngest = async () => {
    const res = await axios.get("https://ingest.twitch.tv/ingests");
    return res.data.ingests[0].url_template.replace("{stream_key}", process.env.STREAM_KEY);
}

(async () => {
    const ingest = await GetIngest();

    let command = ffmpeg()
        .addInput("./assets/bkg.gif")
        .addInputOption("-ignore_loop 0")
        .addInput("https://lofi.stream.laut.fm/lofi")
        .size("1920x1080")
        .videoBitrate(1000, true):
        .withAspect('16:9')
        .videoCodec('libx264')
        .audioCodec('aac')
        .toFormat('flv')
        .save(ingest);
})();
