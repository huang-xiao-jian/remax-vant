// packages
import { CSSProperties } from 'react';

export interface TabUnit {
  // 私有变量，标记 unit 来源
  id: string;
  name: string;
  title: string;
  titleStyle?: CSSProperties;
  disabled: boolean;
  dot?: boolean;
  info?: string;
}
