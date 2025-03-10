import {
  AxisConfig,
  ChartsYAxisProps,
  MakeOptional,
  ScaleName,
} from "@mui/x-charts/internals";

export interface BarChartProps {
  unit?: string;
  max?: number;
  hideLegend?: boolean;
}

export interface LineChartProps {
  unit?: string;
  yAxis?: MakeOptional<AxisConfig<ScaleName, any, ChartsYAxisProps>, "id">[];
  customData?: {
    [key: string]: {
      yAxisKey: string;
      valueFormatter: (val: number | null) => string;
    };
  };
  leftAxis?: string;
  rightAxis?: string;
  min?: number;
  max?: number;
  hideLegend?: boolean;
}

export interface ChartConfig {
  type: "bar" | "line";
  range: string;
  props: BarChartProps | LineChartProps;
  exclude?: string[];
  times?: number;
}

export const chartConfigs: ChartConfig[] = [
  { type: "bar", range: "Overview!A21:N32", props: { max: 100, unit: "%" } },
  {
    type: "bar",
    range: "Overview!A62:N74",
    props: { unit: "kr" },
    exclude: ["Total"],
    times: 1000,
  },
];
