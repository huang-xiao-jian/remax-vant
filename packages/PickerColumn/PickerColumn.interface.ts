export interface CandidateOption {
  // 有效负荷
  value: string | number;
  // view 渲染
  title: string;
  // 禁用选项，理论上应该在传入 CandidatePlayer 之前预处理，暂且搁置
  // disabled?: boolean;
}

export interface ExogenousPickerColumnProps {
  // 候选项
  options: CandidateOption[];
  // 受控组件
  value: string | number;
  // 事件回调
  onChange: (value: string | number) => void;
}

export type PickerColumnProps = ExogenousPickerColumnProps & ShareSkinProps;

export interface PickerColumnNativeEvent {
  detail: { value: string };
}
