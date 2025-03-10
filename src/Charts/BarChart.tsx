import { useState, useEffect } from "react";
import { BarChart as MuiBarChart } from "@mui/x-charts/BarChart";
import { useData } from "../context/DataProvider";
import { addLabels } from "../utils/addLabels";
import colors from "../styling/colors";
import getLabels from "../utils/getLabels";
import { BarChartProps } from "../config/chartConfigs";

const BarChart = ({ unit, max, hideLegend }: BarChartProps) => {
  const { data, loading, setFetchSource } = useData();
  const [chartHeight, setChartHeight] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setChartHeight(isMobile ? 300 : 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setFetchSource]);

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-600">Laddar data...</p>
      </div>
    );
  }

  const labels = getLabels(data, unit);
  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="px-4">
        <h2 className="text-xl font-bold mb-2">{data[-1]?.["title"]}</h2>
        <h3 className="text-lg mb-4">{data[-1]?.["Förklaring"]}</h3>
      </div>

      <div className="w-full px-6 overflow-x-auto">
        <MuiBarChart
          colors={colors}
          dataset={data}
          series={addLabels(labels)}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "year",
              tickLabelStyle: {
                angle: isMobile ? 45 : 0,
                textAnchor: isMobile ? "start" : "middle",
                fontSize: isMobile ? 10 : 12,
              },
            },
          ]}
          yAxis={[
            {
              id: "primary",
              max,
              valueFormatter: (v) =>
                new Intl.NumberFormat("sv-SE").format(v) + (unit ?? ""),
              tickLabelStyle: {
                fontSize: isMobile ? 10 : 12,
              },
            },
          ]}
          height={chartHeight}
          margin={{
            top: isMobile ? 150 : 100,
            right: 20,
            bottom: isMobile ? 60 : 40,
            left: isMobile ? 50 : 70,
          }}
          slotProps={{
            legend: {
              hidden: hideLegend,
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
              padding: 0,
              labelStyle: {
                fontSize: 10,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
