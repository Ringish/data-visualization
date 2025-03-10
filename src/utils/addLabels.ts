export function addLabels<T extends { dataKey: string }>(series: T[]) {
    return series.map((item) => {
      return {
      ...item,
      label: item.dataKey,
    }});
  }