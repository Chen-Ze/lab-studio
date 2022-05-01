/**
 * If any of the parameter is NaN, the generated array will be [] or [stop].
 * @param start The starting value.
 * @param stop The stop value, always included.
 * @param step The step, the sign of which will be inverted if it does not match the sign of (stop - step).
 * @param includeStop If the stopping point should be included.
 * @param inclueStart If the starting point should be included.
 * @returns The array.
 */
export const linspace = (
  start: number,
  stop: number,
  step: number,
  includeStop = true,
  includeStart = true,
  eps?: number
) => {
  if ((stop - start) * step <= 0) step = -step; // correct the sign of step
  const steps = Math.ceil((stop - start) / step);
  const arrayWithoutStop = includeStart
    ? Array.from({ length: steps }, (_, i) => i).map((i) => start + step * i)
    : Array.from({ length: steps - 1 }, (_, i) => i + 1).map(
        (i) => start + step * i
      );
  if (!eps || !arrayWithoutStop.length)
    return includeStop ? [...arrayWithoutStop, stop] : arrayWithoutStop;
  else {
    if (Math.abs(arrayWithoutStop[arrayWithoutStop.length - 1] - stop) < eps) {
      return arrayWithoutStop;
    } else {
      return [...arrayWithoutStop, stop];
    }
  }
};

export const LINSPACE_EPS_SCALE = 1e-6;

export const arrayDirectProduct = <S, T>(
  array1: S[],
  array2: T[]
): [S[], T[]] => {
  return [
    Array(array2.length)
      .fill(array1)
      .reduce((x, y) => x.concat(y)),
    Array(array1.length)
      .fill(array2)
      .reduce((x, y) => x.concat(y)),
  ];
};

export const zipArray = <S, T>(array1: S[], array2: T[]): [S, T][] => {
  return array1.map((x1, i): [S, T] => [x1, array2[i]]);
};
