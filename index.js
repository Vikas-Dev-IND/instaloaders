const express = require("express");
const axios = require("axios");
const cors = require("cors");
const igdl = require("instagram-url-direct");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Instagram URL is required" });

        console.log("Fetching video from:", url); // Debugging ke liye log add karein

        const response = await igdl(url);

        console.log("Response:", response); // Debugging ke liye response check karein

        if (!response || !response.url_list || response.url_list.length === 0) {
            return res.status(400).json({ error: "Invalid or unsupported URL" });
        }

        res.json({ videoUrl: response.url_list[0] });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to fetch the video" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
