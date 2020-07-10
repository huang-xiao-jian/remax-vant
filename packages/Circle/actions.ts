/**
 * @description - split canvas render logical
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

export type CircleColor = string | Record<string, string>;

export const format = (rate: number): number =>
  Math.round(Math.min(Math.max(rate, 0), 100));

export const calcStrokeStyle = (
  context: CanvasRenderingContext2D,
  color: CircleColor,
  size: number
): string | CanvasGradient => {
  if (typeof color === 'string') {
    return color;
  }

  const LinearColor = context.createLinearGradient(size, 0, 0, 0);

  Object.keys(color)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, color[key]));

  return LinearColor;
};

export const calcAngleRange = (
  point: number,
  clockwise: boolean
): [number, number] => {
  const round = 2 * Math.PI;
  const beginAngle = -Math.PI / 2;
  const progress = round * (point / 100);
  const endAngle = clockwise
    ? beginAngle + progress
    : 3 * Math.PI - (beginAngle + progress);

  return [beginAngle, endAngle];
};
