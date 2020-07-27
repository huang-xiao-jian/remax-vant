// 默认值填充属性
export interface NeutralStepperProps {
  min: number;
  max: number;
  step: number;
  integer: boolean;
  disabled: boolean;
  inputWith: string;
  disableInput: boolean;
  buttonSize: string;
  showPlus: boolean;
  disabledPlus: boolean;
  showMinus: boolean;
  disableMinus: boolean;
  decimalLength: number;
  longPress: boolean;
}

export interface ExogenousStepperProps {
  // 受控组件
  value: number;
  // 容器类名，用以覆盖内部
  className?: string;
  onChange?: (value: number) => void;
}

export type StepperProps = NeutralStepperProps & ExogenousStepperProps;

export interface RemantInputEvent {
  detail: {
    value: number;
  };
}
