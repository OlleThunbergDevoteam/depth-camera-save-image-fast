const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
// use json body parser
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/upload/photo", (req, res) => {
  // get the image from the body
  const image = req.body.image;
  // get the image type from the body
  const imageType = req.body.imageType;
  console.log(req.body.userdata);
  // replace the mime type of the base64 string with nothing
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  // Save the base64 jpeg image
  const imageBuffer = Buffer.from(base64Data, "base64");
  const imagePath = `./images/${imageType}/${"img"}.jpeg`;
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.json({ success: true }).end();
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
