/**
 * @description - abstract line style
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { useRef, useState, CSSProperties } from 'react';
import { useNativeEffect } from 'remax';
// internal
import pickStyle from '../tools/pick-style';

function ofLineStyle(
  rects: BoundingClientRectResult[],
  index: number,
  color: string,
  duration: number,
  pristine: boolean
): CSSProperties {
  const current = rects[index];
  const width = current.width / 2;
  const offset = rects
    .slice(0, index)
    .reduce((prev, curr) => prev + curr.width, 0);
  const left = offset + (current.width - width) / 2;

  // eslint-disable-next-line no-underscore-dangle
  const _style: CSSProperties = pickStyle({
    width: `${width}px`,
    backgroundColor: color,
    transform: `translateX(${left}px)`,
    transitionDuration: pristine ? '0ms' : `${duration}ms`,
  });

  return _style;
}

// TODO - 暂不支持自定义 line style
export function useLine(
  id: string,
  type: string,
  duration: number,
  color: string,
  index: number
): CSSProperties {
  // 初次执行不进行转场效果
  const $pristine$ = useRef(true);
  const [style, setStyle] = useState<CSSProperties>({});

  // 推荐仅变更 index 数组
  useNativeEffect(() => {
    if (type === 'line') {
      wx.createSelectorQuery()
        .selectAll(`#${id} .van-tab`)
        .boundingClientRect()
        .exec(([rects]: [BoundingClientRectResult[]]) => {
          // 更新样式
          setStyle(
            ofLineStyle(rects, index, color, duration, $pristine$.current)
          );
          // 首次标记
          $pristine$.current = false;
        });
    }
  }, [id, type, duration, color, index]);

  return style;
}
