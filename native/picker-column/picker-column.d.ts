// package
import { FunctionComponent } from 'react';

export interface CandidateOption {
  // 有效负荷
  value: string | number;
  // view 渲染
  title: string;
  // 禁用选项，理论上应该在传入 CandidatePlayer 之前预处理，暂且搁置
  // disabled?: boolean;
}

interface PickerOptionChangeEvent {
  detail: {
    value: string;
  };
}

interface PickerColumnProps {
  itemHeight: number;
  visibleItemCount: number;
  options: CandidateOption[];
  value: string | number;
  bindchange: (event: PickerOptionChangeEvent) => void;
}

declare const PickerColumn: FunctionComponent<PickerColumnProps>;

export default PickerColumn;
