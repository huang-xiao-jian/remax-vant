// package
import { ReactElement } from 'react';
import { InputProps } from 'remax/wechat';
// internal
import { CellProps } from '../Cell/Cell.interface';

export type TransparentFieldProps = Omit<
  CellProps,
  'linkType' | 'value' | 'onClick'
>;

// 默认值填充属性
// prettier-ignore
export interface NeutralFieldProps extends TransparentFieldProps, InputProps {
  // | 'textarea'
  fixed: boolean;
  readonly: boolean;
  clearable: boolean;
  titleWidth: string;
  inputAlign: 'left' | 'center' | 'right';
  showConfirmBar: boolean;
  disableDefaultPadding: boolean;
}

export interface ExogenousFieldProps {
  // 受控组件
  value?: string;
  onChange?: (value: string) => void;
  // button 特殊处理
  button?: ReactElement;
  error?: boolean;
  errorMessage?: string;
  errorMessageAlign?: 'center' | 'right';
}

export type FieldProps = NeutralFieldProps & ExogenousFieldProps;
