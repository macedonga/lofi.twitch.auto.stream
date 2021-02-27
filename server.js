const express = require("express");
const osu = require("node-os-utils");

const stream = require("./stream");

const cpu = osu.cpu;
const mem = osu.mem;
const netstat = osu.netstat;
const os = osu.os;

const app = express();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const cpuPerc = await cpu.usage();
    const ramPerc = await mem.info();
    const uptime = await os.uptime();

    res.render("index", { cpu: cpuPerc, ram: 100 - ramPerc.freeMemPercentage, uptime: uptime, started: stream.Started });
});

app.get("/start", (req, res) => {
    if (req.headers.authorization == process.env.AUTH) {
        if (stream.Started) stream.Stop();
        else stream.Start();
        return res.send({ message: "Ok!" });
    } else return res.send({ message: "Wrong key!" });
});

app.get("/bkg", (req, res) => {
    res.sendFile(__dirname + "/assets/bkg.gif");
})

module.exports.Listen = (PORT) => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
}