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
    const mimeSuffix = file.mime ? file.mime.split("/").pop() : "";
    const type =
      ext || mimeSuffix || (file.fileType === "image" ? "image" : "file");
    return res.status(200).json({
      name: file.name,
      imageKitUrl: file.url,
      storedFilename: file.fileId,
      size: file.size,
      type,
    });
  } catch (error) {
    console.error("file-info-error:", error);
    res.status(500).json({ error: "Failed to Fetch file info" });
  }
});
app.get("/recent-Uploads", async (req, res) => {
  try {
    const sessionId = req.query.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID required" });
    }
    const files = await imageKit.listFiles({
      tags: ["jshare"], // Only filter by "jshare" tag
      sort: "DESC_CREATED",
    });

    // Filter files to only those with the correct session tag
    const shaped = files
      .filter((f) => f.tags && f.tags.includes(`session_${sessionId}`))
      .map((f) => {
        const ext =
          f.name && f.name.includes(".")
            ? f.name.split(".").pop().toLowerCase()
            : "";
        const mimeSuffix = f.mime ? f.mime.split("/").pop() : "";
        const type =
          ext || mimeSuffix || (f.fileType === "image" ? "image" : "file");

        return {
          originalname: f.name,
          imageKitUrl: f.url,
          link: `${baseUrl}/download/${f.fileId}`,
          type,
          filename: f.fileId,
        };
      });
    res.status(200).json(shaped);
  } catch (error) {
    console.error("recent-uploads error:", error);
    res.status(500).json({ error: "Failed to fetch recent uploads. " });
  }
});
//!FILE DELETION
app.delete("/files/:fileId", async (req, res) => {
  try {
    const sessionId = req.query.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID required" });
    }

    const fileId = req.params.fileId;
    const file = await imageKit.getFileDetails(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (!file.tags || !file.tags.includes(`session_${sessionId}`)) {
      return res
        .status(403)
        .json({ error: "Forbidden: You don’t own this file" });
    }

    await imageKit.deleteFile(fileId);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete File error:", error);
    res.status(500).json({ error: "Failed to delete File" });
  }
});
app.get("/download/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await new imageKit.getFileDetails(fileId);
    if (!file) {
      return res.status(404).json({ error: "File Not Found" });
    }
    //Fetch file from ImageKit URL
    const response = await fetch(file.url);
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", file.mime || "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Download Error:", err);
    res.status(500).json({ error: "Download Failed" });
  }
});
app.get("/", (req, res) => {
  res.send("Server is Running!!");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
