/**
 * @description - concatate styles
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { CSSProperties } from 'react';

// internal
import pickStyle from '../tools/pick-style';

export function ofScrollView(color: string): CSSProperties {
  return pickStyle({
    borderColor: color,
  });
}

export function ofNaviView(
  color: string,
  type: 'line' | 'card'
): CSSProperties {
  return pickStyle({
    borderColor: type === 'card' ? color : '',
  });
}

export function ofUnit(
  active: boolean,
  ellipsis: boolean,
  color: string,
  type: 'line' | 'card',
  disabled: boolean,
  activeColor: string | undefined,
  inactiveColor: string | undefined,
  swipeThreshold: number,
  scrollable: boolean
): CSSProperties {
  const style: CSSProperties = {};

  // card theme color
  if (color && type === 'card') {
    style.borderColor = color;

    if (!disabled) {
      if (active) {
        style.backgroundColor = color;
      } else {
        style.color = color;
      }
    }
  }

  if (scrollable && ellipsis) {
    style.flexBasis = `${88 / swipeThreshold}%`;
  }
  style.color = active ? activeColor : inactiveColor;

  return pickStyle(style);
}

export function ofTrackTranslateX(
  animated: boolean,
  index: number,
  deltaX: number
): string {
  if (animated) {
    return deltaX >= 0
      ? `calc(${-100 * index}% + ${deltaX}px)`
      : `calc(${-100 * index}% - ${Math.abs(deltaX)}px)`;
  }

  return `${deltaX}px`;
}

export function ofTrack(
  animated: boolean,
  index: number,
  duration: number,
  dragging: boolean,
  deltaX: number
): CSSProperties {
  const style: CSSProperties = {};

  if (dragging) {
    const translateX = ofTrackTranslateX(animated, index, deltaX);

    style.transform = `translateX(${translateX})`;
    style.transitionDuration = '0ms';
  } else if (animated) {
    style.transform = `translateX(${-100 * index}%)`;
    style.transitionDuration = `${duration}ms`;
  }

  return style;
}
