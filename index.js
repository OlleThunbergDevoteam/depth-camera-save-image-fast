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
  // Save the base64 jpeg image
  const imageBuffer = Buffer.from(image, "base64");
  const imagePath = `./images/${imageType}/${Date.now()}.jpeg`;
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.json({ sucess: true }).end();
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
