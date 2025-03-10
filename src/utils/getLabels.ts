import valueFormatter from "./valueFormatter";

const getLabels = (
  data: any,
  unit?: string,
  line?: boolean,
  customData?: {
    [key: string]: {
      yAxisKey: string;
      valueFormatter: (val: number | null) => string;
    };
  }
) =>
  Object.keys(data[0] ?? {})
    .map((dataKey, index) => ({
      dataKey,
      stack: line ? index.toString() : "assets",
      valueFormatter: (val: number | null) => customData?.[dataKey]?.valueFormatter(val) ?? valueFormatter(val, unit),
      yAxisKey: customData?.[dataKey]?.yAxisKey ?? 'primary'
    }))
    .filter(
      ({ dataKey }) =>
        dataKey !== "year" && dataKey !== "Förklaring" && dataKey !== ""
    );

export default getLabels;
