export const convertToDecimal = (value: string | number) => {
    if (typeof value === "string" && value.includes("%")) {
      return parseFloat(value.replace("%", "").trim()) / 100;
    }
    return Number(value) / 100;
};