import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import formatData from "../utils/formatData";

type DataPoint = {
  year: string;
  [key: string]: number | string;
};

interface DataContextValue {
  data: DataPoint[];
  loading: boolean;
  fetchSource: "local" | "api";
  setFetchSource: (source: "local" | "api") => void;
}

const DataContext = createContext<DataContextValue>({
  data: [],
  loading: true,
  fetchSource: "local",
  setFetchSource: () => {},
});

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID;
const BASE_PATH = process.env.REACT_APP_BASE_PATH;
const FETCH_SOURCE = process.env.REACT_APP_FETCH_SOURCE as "local" | "api"

export const DataProvider: React.FC<{
  localFile?: string;
  apiConfig: { range: string };
  times?: number;
  exclude?: string[];
  title?: string;
  children: ReactNode;
}> = ({ localFile, apiConfig, times = 1, exclude, title, children }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchSource, setFetchSource] = useState<"local" | "api">(FETCH_SOURCE);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let result;
        if (fetchSource === "local") {
          const basePath = BASE_PATH;

          const localData = await fetch(`${basePath}/${apiConfig.range}.json`);
          result = await localData.json();
        } else if (fetchSource === "api") {
          const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${apiConfig.range}?key=${API_KEY}`
          );
          result = await response.json();
        }

        const rows = title ? result.values : result.values.slice(1);
        const years = rows[0].slice(1);
        const apiData = years.map((year: string) => ({ year }));
        const myDataRows = rows.slice(1);
        for (let i = 0; i < myDataRows.length; i++) {
          const row = myDataRows[i];
          const key = row[0];
          for (let c = 0; c < row.length; c++) {
            const cell = row[c];
            if (cell === "Förklaring") {
              apiData[-1] = {
                Förklaring: row[c + 1],
                title: title ?? result.values[0][0],
              };
            }
            if (c > 0 && !exclude?.includes(key)) {
              const parsedValue = formatData(cell);
              apiData[c - 1] = {
                ...apiData[c - 1],
                [key]: isNaN(parsedValue) ? 0 : parsedValue * times,
              };
            }
          }
          setData(apiData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchSource, localFile, apiConfig, title, exclude, times]);

  return (
    <DataContext.Provider
      value={{ data, loading, fetchSource, setFetchSource }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
