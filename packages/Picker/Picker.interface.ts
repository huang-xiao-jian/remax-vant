// 默认值填充属性
export interface NeutralPickerProps {
  loading: boolean;
  showToolbar: boolean;
  toolbarPosition: 'top' | 'bottom';
  // PickerToolbar 配置参数
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  // PickerColumn 配置参数
  itemHeight: number;
  visibleItemCount: number;
}

export interface ExogenousPickerProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onCancel?: () => void;
  onConfirm?: () => void;
}

export type PickerProps = NeutralPickerProps & ExogenousPickerProps;
