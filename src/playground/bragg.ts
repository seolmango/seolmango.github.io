export type Structure = 'SC' | 'BCC' | 'FCC';
export type Peak = {
  hkl: string;
  s: number;
  d: number;
  twoTheta: number;
  intensity: number;
  multiplicity: number;
};
export const wavelengths = { cu: 1.5406, co: 1.789, mo: 0.7107 } as const;
export type Radiation = keyof typeof wavelengths;

function allowed(
  h: number,
  k: number,
  l: number,
  structure: Structure,
): boolean {
  if (structure === 'SC') return true;
  if (structure === 'BCC') return (h + k + l) % 2 === 0;
  return h % 2 === k % 2 && k % 2 === l % 2;
}

function multiplicity(h: number, k: number, l: number): number {
  const values = [h, k, l];
  const reflections = new Set<string>();
  for (const a of values)
    for (const b of values)
      for (const c of values) {
        const sorted = [a, b, c].sort((x, y) => x - y);
        if (sorted.join(',') !== [...values].sort((x, y) => x - y).join(','))
          continue;
        for (const sa of [-1, 1])
          for (const sb of [-1, 1])
            for (const sc of [-1, 1])
              reflections.add(`${sa * a},${sb * b},${sc * c}`);
      }
  return reflections.size;
}

export function calculatePeaks(
  structure: Structure = 'FCC',
  a = 3.6,
  wavelength: number = wavelengths.cu,
): Peak[] {
  const groups = new Map<
    number,
    { h: number; k: number; l: number; multiplicity: number }
  >();
  for (let h = 0; h <= 8; h++)
    for (let k = 0; k <= h; k++)
      for (let l = 0; l <= k; l++) {
        if (h === 0 || !allowed(h, k, l, structure)) continue;
        const s = h * h + k * k + l * l;
        const current = groups.get(s);
        const count = multiplicity(h, k, l);
        if (!current) groups.set(s, { h, k, l, multiplicity: count });
        else
          groups.set(s, {
            h,
            k,
            l,
            multiplicity: current.multiplicity + count,
          });
      }
  const raw = Array.from(groups, ([s, item]) => {
    const d = a / Math.sqrt(s),
      ratio = wavelength / (2 * d);
    if (ratio > 1) return null;
    const theta = Math.asin(ratio),
      twoTheta = (2 * theta * 180) / Math.PI;
    if (twoTheta < 10 || twoTheta > 120) return null;
    const lp =
      (1 + Math.cos(2 * theta) ** 2) / (Math.sin(theta) ** 2 * Math.cos(theta));
    return {
      hkl: `${item.h}${item.k}${item.l}`,
      s,
      d,
      twoTheta,
      intensity: item.multiplicity * lp,
      multiplicity: item.multiplicity,
    };
  })
    .filter((peak): peak is Peak => peak !== null)
    .sort((x, y) => x.twoTheta - y.twoTheta);
  const max = Math.max(...raw.map((peak) => peak.intensity), 1);
  return raw.map((peak) => ({
    ...peak,
    intensity: (peak.intensity / max) * 100,
  }));
}

export function chartPeaks(
  peaks: Peak[],
): (Peak & { x: number; label: boolean })[] {
  let lastLabel = -100;
  return peaks.map((peak, index) => {
    const x = ((peak.twoTheta - 10) / 110) * 100;
    const label = index < 8 && x - lastLabel >= 3;
    if (label) lastLabel = x;
    return { ...peak, x, label };
  });
}
