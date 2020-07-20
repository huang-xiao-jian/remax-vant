/**
 * @description - lite implement touch monitor
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { useState, useCallback, useRef } from 'react';

type TouchDirection = 'horizontal' | 'vertical' | '';

interface TouchState {
  direction: TouchDirection;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  // 滑动状态标记
  dragging: boolean;
}

interface TouchCornerstone {
  startX: number;
  startY: number;
}

interface TouchLiteHook {
  disc: TouchState;
  onTouchStart: (event: TouchEventMini) => void;
  onTouchMove: (event: TouchEventMini) => void;
  onTouchEnd: (event: TouchEventMini) => void;
}

const DefaultTouchState: TouchState = {
  direction: '',
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  dragging: false,
};

function detectDirection(x: number, y: number) {
  const MIN_DISTANCE = 10;

  switch (true) {
    case x > y && x > MIN_DISTANCE:
      return 'horizontal';
    case y > x && y > MIN_DISTANCE:
      return 'vertical';
    default:
      return '';
  }
}

export function useTouchLite(): TouchLiteHook {
  const cornorstone = useRef<TouchCornerstone>({
    startX: 0,
    startY: 0,
  });
  const [disc, setDisc] = useState<TouchState>(DefaultTouchState);
  const onTouchStart = useCallback((event: TouchEventMini) => {
    // 重置内部状态，无 merge 设置
    setDisc(DefaultTouchState);

    // 记录打点
    const [touch] = event.touches;

    cornorstone.current.startX = touch.clientX;
    cornorstone.current.startY = touch.clientY;
  }, []);

  const onTouchMove = useCallback((event: TouchEventMini) => {
    // 计算移动
    const [touch] = event.touches;
    const deltaX = touch.clientX - cornorstone.current.startX;
    const deltaY = touch.clientY - cornorstone.current.startY;
    const offsetX = Math.abs(deltaX);
    const offsetY = Math.abs(deltaY);
    const direction = detectDirection(offsetX, offsetY);

    setDisc({
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      direction,
      dragging: true,
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    setDisc((acc) => ({ ...acc, dragging: false }));
  }, []);

  return { disc, onTouchStart, onTouchMove, onTouchEnd };
}
