const express = require("express");
const multer = require("multer");
const cors = require("cors");
const ImageKit = require("imagekit");
require("dotenv").config();

const app = express();
const baseUrl = process.env.BACKEND_URL || "https://jshare-server.onrender";
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
//!FUCK THIS WE ARENT USING IT NO MORE!
//? Simple in-memory metadata store:
//? key = storedFilename (what multer saves), value = { originalName, size, type }
// const fileMetadata = {};

//*Middleware
app.use(cors({ origin: "" }));
app.use(express.json());
//* Multer configuration (Store in memory)
const storage = multer.memoryStorage({});
const Uploads = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, //* 100MB limit bro
});

//! UPLOAD ROUTE FOR SINGLE FILE
app.post("/upload", Uploads.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Files Uploaded" });
    }
    const sessionId = req.body.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID required" });
    }
    const result = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/jshare_Uploads",
      tags: ["jshare", `session_${sessionId}`],
    });
    res.status(200).json({
      originalName: req.file.originalname,
      link: `${baseUrl}/download/${result.fileId}`,
      imageKitUrl: result.url,
      filename: result.fileId,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: "File Too Large " });
      }
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message || "Upload Failed" });
  }
});
//!Test Route
app.get("/file-info/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await imageKit.getFileDetails(fileId);
    if (!file) {
      return res.status(404).json({ error: "File Not Found" });
    }
    //TODO: FIX THE FILE TYPE: Just need to get the Filetype
    // Prefer real extension from name, then fall back to MIME suffix, then a sane label
    const ext =
      file.name && file.name.includes(".")
        ? file.name.split(".").pop().toLowerCase()
        : "";
        const mimeSuffix = file.mime ? file.mime.split('/').pop() : ""
  } catch (error) {}
});
