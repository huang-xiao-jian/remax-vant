/**
 * @description - extract helper code
 */

// packages
import { CSSProperties } from 'react';

// internal

type DeriveStyleAbstract = (
  color: string | undefined,
  plain: boolean
) => CSSProperties;
type PickColorAbstract = (
  type: 'default' | 'primary' | 'info' | 'warning' | 'danger',
  color: string | undefined,
  plain: boolean
) => string;

// eslint-disable-next-line import/prefer-default-export
export const deriveStyle: DeriveStyleAbstract = (color, plain) => {
  const style: CSSProperties = {};

  if (color) {
    style.color = plain ? color : '#ffffff';

    // Use background instead of backgroundColor to make linear-gradient work
    if (!plain) {
      style.background = color;
    }

    // hide border when color is linear-gradient
    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  return style;
};

export const pickColor: PickColorAbstract = (type, color, plain) => {
  if (plain) {
    return color ?? '#c9c9c9';
  }

  if (type === 'default') {
    return '#c9c9c9';
  }

  return '#fff';
};
