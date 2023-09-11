export function formatPrice(value: number, unit: string) {
  let timeString;

  timeString = translateUnit(unit);

  const formattedValue = value.toFixed(2);
  const result = `$${formattedValue} por ${timeString}`;

  return result;
}

export const translateUnit = (unit: string) => {
  switch (unit) {
    case "hour":
      return "hora";
    case "day":
      return "dia";
    case "week":
      return "semana";
    case "month":
      return "mês";
    default:
      return "";
  }
};
