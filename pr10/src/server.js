import express from "express";
import { readFile } from "fs/promises";

const app = express();
const PORT = 3000;

// Directly use relative path (make sure logs/error.log exists)
const LOG_FILE = "../logs/error.log";
// console.log(LOG_FILE);

app.get("/", async (req, res) => {
  try {
    const data = await readFile(LOG_FILE, "utf8");
    // console.log("asd"+data);
    
    res.send(`
      <h1>PR10</h1>
      <h1>Error Logs</h1>
      <pre style="background:#f4f4f4; padding:15px; border:1px solid #ccc;">
${data}
      </pre>
    `);
  } catch (err) {
    res.status(500).send(`
      <h2 style="color:red;">Error: Could not read log file.</h2>
      <p>Details: ${err.message}</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
