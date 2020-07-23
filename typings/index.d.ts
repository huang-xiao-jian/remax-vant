// non-ts assets
declare module '*.png';
declare module '*.css';

declare interface BoundingClientRectResult {
  /** 下边界 */
  bottom: number;
  /** 高度 */
  height: number;
  /** 左边界 */
  left: number;
  /** 右边界 */
  right: number;
  /** 上边界 */
  top: number;
  /** 宽度 */
  width: number;
}

declare interface TouchPointMini {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

declare interface TouchEventMini {
  touches: TouchPointMini[];
}

declare interface ShareSkinProps {
  // 内嵌样式，覆盖内部
  style?: React.CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}
