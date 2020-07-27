// package
import { ReactElement, CSSProperties } from 'react';

// 默认值填充属性
export interface NeutralCellProps {
  required: boolean;
  border: boolean;
  clickable: boolean;
  isLink: boolean;
  center: boolean;
  size: 'default' | 'large';
  linkType: 'redirectTo' | 'switchTab' | 'reLaunch' | 'navigateTo';
}

export interface ExogenousCellProps {
  titleWidth?: string;
  // the same name slot
  title?: string | ReactElement;
  icon?: string | ReactElement;
  label?: string | ReactElement;
  value?: string | ReactElement;
  rightIcon?: string | ReactElement;
  url?: string;
  style?: CSSProperties;
  arrowDirection?: 'left' | 'up' | 'down';
  // 改造新增属性
  hoverClassName?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClick?: (event: any) => void;
}

export type CellProps = NeutralCellProps & ExogenousCellProps;
