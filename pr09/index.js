import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("“Welcome to our site pr9”");
});

app.listen(5000, () => {
    console.log("app is listening on port 5000");
})