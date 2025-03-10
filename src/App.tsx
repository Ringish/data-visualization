
import { DataProvider } from "./context/DataProvider";
import CustomBarChartResponsive from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import { chartConfigs, LineChartProps } from "./config/chartConfigs";

const App = () => {
  return (
    <div className="transparent-graphs">
      {chartConfigs.map(({ type, range, props, exclude, times }, index) => (
        <DataProvider
          key={index}
          apiConfig={{ range }}
          exclude={exclude}
          times={times}
        >
          {type === "bar" ? (
            <CustomBarChartResponsive {...props} />
          ) : (
            <LineChart {...(props as LineChartProps)} />
          )}
        </DataProvider>
      ))}
    </div>
  );
};

export default App;
