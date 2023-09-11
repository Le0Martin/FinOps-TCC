import { translateUnit } from "./priceFormatter";

export function converterDolarParaReal(
  valorEmDolar: number,
  taxaDeCambio: number,
  unidade: string
) {
  const valorEmReais = valorEmDolar * taxaDeCambio;
  let timeString = translateUnit(unidade);

  const result = `R$${valorEmReais.toFixed(2)} por ${timeString}`;

  return result;
}
