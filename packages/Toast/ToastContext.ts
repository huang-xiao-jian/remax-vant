// packages
import { createContext } from 'react';

export interface ToastContextAbstract {
  type: 'loading' | 'success' | 'fail' | 'html' | 'text';
  position: 'top' | 'middle' | 'bottom';
  message: string;
  mask: boolean;
  forbidClick: boolean;
  loadingType: 'circular' | 'spinner';
  zIndex: number;
  duration: number;
  selector: string;
  visible: boolean;
}

export const DefautlToastContextPayload: ToastContextAbstract = {
  type: 'fail',
  position: 'middle',
  message: '失败文案',
  mask: false,
  forbidClick: false,
  loadingType: 'spinner',
  zIndex: 1000,
  duration: 2000,
  selector: 'van-toast',
  visible: true,
};

export const ToastContext = createContext<ToastContextAbstract>(
  DefautlToastContextPayload
);
