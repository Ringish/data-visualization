import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { google, sheets_v4 } from "googleapis";
import { chartConfigs, ChartConfig } from "@config/chartConfigs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SHEET_ID: string = process.env.REACT_APP_GOOGLE_SHEETS_ID || "";
const API_KEY: string = process.env.REACT_APP_GOOGLE_API_KEY || "";
const OUTPUT_DIR: string = path.join(__dirname, "../../public/json-data");

const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth: API_KEY });

const fetchData = async (range: string): Promise<void> => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.error(`❌ Ingen data hittades för ${range}`);
      return;
    }

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    const safeFileName = range.replace(/[^\w\s-]/g, "").replace(/\s+/g, "_");
    const filePath = path.join(OUTPUT_DIR, `${safeFileName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
    console.log(`✅ Sparade ${filePath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Fel vid hämtning av ${range}:`, error.message);
    } else {
      console.error(`❌ Ett okänt fel inträffade vid hämtning av ${range}`);
    }
  }
};

const main = async (): Promise<void> => {
  for (const range of chartConfigs.map((config: ChartConfig) => config.range)) {
    await fetchData(range);
  }
  console.log("🎉 Alla JSON-filer genererade!");
};

main();