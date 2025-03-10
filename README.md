# Data Visualization App

This project is a Node.js and React-based application that visualizes data, primarily from association annual meetings. The data is sourced from a Google Sheet document, which is then processed and visualized in a user-friendly interface.

## Setup Guide

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Sheets document with the necessary data
- Google API Key for Sheets API access

### 1. Create and Configure Google Sheet

1. **Create a Google Sheets document** with your data.
   - Make sure the structure follows the example provided in the `sheet-screenshot.png` image. This screenshot shows how the data should be structured within the Google Sheet.
   
2. **Save the Google Sheets Document ID** from the URL:
   - The document ID is part of the URL, e.g., `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`.

3. **Create a Google API Key**:
   - Follow the instructions [here](https://developers.google.com/sheets/api/quickstart/js) to create an API Key.
   - Make sure to enable the Google Sheets API in the Google Cloud Console for your project.

### 2. Clone the Repository

```bash
git clone https://github.com/your-repo/data-visualization-app.git
cd data-visualization-app
```

### 3. Install Dependencies

Run the following command to install the necessary dependencies for both React and the JSON Fetcher:

```bash
npm install
```

### 4. Configure Environment Variables

Copy the .env.example file and rename it to .env. Then, update the environment variables with your Google API key and Google Sheets document ID:

```env
REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
REACT_APP_GOOGLE_SHEETS_ID=YOUR_SHEET_ID

REACT_APP_BASE_PATH=/json-data
```

### 5. Start the Application

Run the following command to start the frontend application:
```bash
npm run start
```

This will spin up the React application and make it available on http://localhost:3000.

### 6. Configure Chart Data

The chart configurations need to be mapped to your Google Sheets document. To do this, you need to update the src/config/chartConfig.ts file. Below is an example of how the chart configuration works:
```typescript
export const chartConfigs: ChartConfig[] = [
  { type: "bar", range: "Overview!A21:N32", props: { max: 100, unit: "%" } },
  {
    type: "bar",
    range: "Overview!A62:N74",
    props: { unit: "kr" },
    exclude: ["Total"],
    times: 1000,
  },
  // Additional configurations...
];
```

type: Define the chart type, either "bar" or "line".
	•	range: Specify the range in the format SheetName!A1:N10, where SheetName is the name of the sheet, and A1:N10 is the data range.
	•	props: Define properties like unit, max, and any additional configurations relevant to your chart type.

### 7. Fetch Data and Cache

Once the chart configurations are set, you can fetch and cache the data to avoid repeated API calls to Google Sheets. To do this, run the following commands:
1.	Install dependencies for the JSON fetcher:
```bash
npm run fetcher:install
```
2.	Build the fetcher project:
```bash
npm run fetcher:build
```
3.	Run the fetcher to generate the JSON files:
```bash
npm run fetcher:run
```

The JSON files will be stored locally, and you can configure the app to use them instead of fetching data directly from Google Sheets.

### 8. Update Fetch Source

In your .env file, set REACT_APP_FETCH_SOURCE to "local" to use the locally cached JSON files:
```env
REACT_APP_FETCH_SOURCE=local
```

### 9. Deployment

When you’re ready to deploy the application, ensure that the REACT_APP_BASE_PATH is set correctly for your hosting environment. For example, if deploying to a WordPress site, the base path might look like this:
```env
REACT_APP_BASE_PATH=/wp-content/themes/my-theme/build/json-data
```

#### License

This project is licensed under the MIT License - see the LICENSE file for details.

This README is written for developers who want to set up and contribute to the project. It assumes they have basic knowledge of working with Node.js, React, and Google Sheets.