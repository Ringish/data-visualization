import React, { useState, useEffect } from "react";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { useData } from "../context/DataProvider";
import { addLabels } from "../utils/addLabels";
import colors from "../styling/colors";
import getLabels from "../utils/getLabels";
import { LineChartProps } from "../config/chartConfigs";

const LineChart = ({
  unit,
  yAxis,
  customData,
  leftAxis,
  rightAxis,
  min,
  max,
  hideLegend,
}: LineChartProps) => {
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

  const labels = getLabels(data, unit, true, customData);
  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="px-4">
        <h2 className="text-xl font-bold mb-2">{data[-1]?.["title"]}</h2>
        <h3 className="text-lg mb-4">{data[-1]?.["Förklaring"]}</h3>
      </div>

      <div className="w-full px-4 overflow-x-auto">
        <MuiLineChart
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
          yAxis={
            yAxis ?? [
              {
                id: "primary",
                valueFormatter: (v) =>
                  new Intl.NumberFormat("sv-SE").format(v) + (unit ?? ""),
                tickLabelStyle: {
                  fontSize: isMobile ? 10 : 12,
                },
                min,
                max,
              },
            ]
          }
          leftAxis={leftAxis ?? "primary"}
          rightAxis={rightAxis}
          height={chartHeight}
          margin={{
            top: isMobile ? 60 : 100,
            right: 20,
            bottom: isMobile ? 60 : 40,
            left: isMobile ? 50 : 70,
          }}
          slotProps={{
            legend: {
              hidden: hideLegend,
              direction: isMobile ? "column" : "row",
              position: {
                vertical: "top",
                horizontal: "middle",
              },
              labelStyle: {
                fontSize: isMobile ? 10 : 12,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
