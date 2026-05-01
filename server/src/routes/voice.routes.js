import express from "express";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", upload.single("audio"), async (req, res) => {
  const transcript = await openai.audio.transcriptions.create({
    file: fs.createReadStream(req.file.path),
    model: "whisper-1"
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: transcript.text }]
  });

  const reply = completion.choices[0].message.content;

  const speech = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: reply
  });

  const buffer = Buffer.from(await speech.arrayBuffer());

  res.setHeader("Content-Type", "audio/mpeg");
  res.send(buffer);
});

export default router;