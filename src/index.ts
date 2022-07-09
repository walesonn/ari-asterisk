import "dotenv/config";
import * as client from "ari-client";

const url = process.env.ARI_HOST || "http://localhost:8088";
const username = process.env.ARI_USER || "some user";
const password = process.env.ARI_PASS || "some pass";

client.connect(url, username, password, function (err, ari) {
  if (err) {
    throw err;
  }

  ari.on("StasisStart", async (event, channel) => {
    console.log("we are into our app [info] [%s]" + event.channel.id);

    await channel.answer();
    await channel.play({ media: "sound:tt-mokeys" }, ari.Playback());
  });

  ari.on("StasisEnd", (event, channel) => {
    console.log("we are out our app [info] [%s]" + event.channel.id);
  });

  ari.start("ari");
});
