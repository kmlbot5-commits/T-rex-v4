const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/prompt", (req, res) => {
  const { subject = "", action = "", style = "cinematic realistic", duration = 10, ratio = "9:16" } = req.body || {};
  const prompt = [
    subject.trim() || "a cinematic subject",
    action.trim() || "moving naturally with dynamic camera movement",
    `${style}, ultra detailed, realistic lighting, natural motion`,
    `vertical ${ratio} composition, ${duration}-second video`,
    "smooth camera movement, consistent subject appearance, high detail, no text, no watermark"
  ].join(". ");
  res.json({ prompt });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Trex AI Free running on port ${PORT}`));
