import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const baseUrl = "https://api.fwc.gov.au/api/v1";

// Proxy endpoint that fetches all pages and merges results
app.post("/proxy", async (req, res) => {
  try {
    const { endpoint, params, apiKey } = req.body;
    if (!endpoint || !apiKey) return res.status(400).json({ error: "Endpoint and API key required" });

    let url = baseUrl + endpoint;
    const result = [];
    let page = 1;
    let limit = params.limit || 50;

    while (true) {
      const queryParams = { ...params, page, limit };
      const searchParams = new URLSearchParams(queryParams).toString();
      const fullUrl = `${url}?${searchParams}`;

      const response = await fetch(fullUrl, {
        headers: { "Ocp-Apim-Subscription-Key": apiKey }
      });

      if (!response.ok) throw new Error(`API Error ${response.status}`);

      const json = await response.json();
      const data = json.data || json.results || [];

      result.push(...data);

      if (data.length < limit) break; // last page
      page++;
    }

    // Return both total count and merged data
    res.json({ totalCount: result.length, data: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
