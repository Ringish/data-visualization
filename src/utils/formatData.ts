const formatData = (value: string) => {
  return parseFloat(
    value
      .replace(",", ".")
      .replace("%", "")
      .replace("−", "-")
      .replace(/[^0-9.-]/g, "")
      .trim()
  );
};

export default formatData;
