const valueFormatter = (val: number | null, unit?: string): string => {
  return val !== null ? new Intl.NumberFormat('sv-SE').format(val) + (unit ?? "") : "";
};

export default valueFormatter;
