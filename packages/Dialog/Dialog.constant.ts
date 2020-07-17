// packages
import { CSSProperties, ReactElement } from 'react';
// internal
import { OpenTypeMixin, ButtonMixin } from '../mixin';

// 默认值填充属性
export interface NeutralDialogProps {
  visible: boolean;
  width: string;
  messageAlign: 'left' | 'right' | 'center';
  zIndex: number;
  transition: 'fade' | 'scale';
  showConfirmButton: boolean;
  showCancelButton: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonColor: string;
  cancelButtonColor: string;
  confirmButtonLoading: boolean;
  cancelButtonLoading: boolean;
  overlay: boolean;
  overlayStyle: CSSProperties;
}

export interface ExogenousDialogProps {
  title?: string | ReactElement;
  message?: string | ReactElement;
  // 内嵌样式
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onClickOverlay?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export type DialogProps = NeutralDialogProps &
  ExogenousDialogProps &
  OpenTypeMixin &
  ButtonMixin;

export const DefaultDialogManagerOptions: DialogProps = {
  visible: false,
  transition: 'scale',
  width: '320px',
  messageAlign: 'center',
  zIndex: 100,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  confirmButtonColor: '#1989fa',
  cancelButtonColor: '#333',
  confirmButtonLoading: false,
  cancelButtonLoading: false,
  overlay: true,
  overlayStyle: {},
};

export interface DialogManagerAlertOptions extends DialogProps {
  asyncClose?: boolean;
  closeOnClickOverlay?: boolean;
}
