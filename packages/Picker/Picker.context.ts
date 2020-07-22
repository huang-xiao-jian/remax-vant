// package
import { createContext } from 'react';

export interface PickerContextPayload {
  // confirmButtonText: string;
  // cancelButtonText: string;
  // PickerColumn 配置参数
  // item 高度
  itemHeight: number;
  // 可见 item 数量
  visibleItemCount: number;
}

export const PickerContext = createContext<PickerContextPayload>({
  itemHeight: 44,
  visibleItemCount: 5,
});
