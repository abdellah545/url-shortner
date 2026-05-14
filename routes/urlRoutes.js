const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const Url = require("../models/Url");

// دالة للتحقق من صحة الرابط
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

/* ================= SHORTEN URL ================= */

router.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // 1. Validation للرابط
    if (!isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // 2. منع تكرار نفس URL
    let existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.json({
        shortUrl: `${req.protocol}://${req.get("host")}/${existingUrl.shortCode}`,
        shortCode: existingUrl.shortCode,
        isNew: false
      });
    }

    // 3. توليد short code احترافي باستخدام nanoid
    const shortCode = nanoid(8);

    const newUrl = new Url({
      originalUrl: url,
      shortCode: shortCode,
    });

    await newUrl.save();

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
      shortCode: shortCode,
      isNew: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= GET STATS ================= */

router.get("/stats/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode: shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= REDIRECT URL ================= */

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode: shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // زيادة عدد الزيارات
    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
