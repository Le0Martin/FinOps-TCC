export function formatBits(bits: number) {
  bits = bits / 8;
  const bitsPerGb = 1024 * 1024 * 1024;
  const bitsPerMb = 1024 * 1024;
  const bitsPerKb = 1024;

  if (bits >= bitsPerGb) {
    const gb = bits / bitsPerGb;
    return `${gb.toFixed(2)} GB`;
  }

  if (bits >= bitsPerMb) {
    const mb = bits / bitsPerMb;
    return `${mb.toFixed(2)} MB`;
  }

  if (bits >= bitsPerKb) {
    const kb = bits / bitsPerKb;
    return `${kb.toFixed(2)} KB`;
  }

  return `${bits.toFixed(2)} bits`;
}

export function gbToBits(gb: number): number {
  const bitsPerGb = 1024 * 1024 * 1024 * 8;
  return gb * bitsPerGb;
}
