// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View, Input } from 'remax/wechat';
// internal
import { Select } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Stepper.css';

// 默认值填充属性
interface NeutralStepperProps {
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

interface ExogenousStepperProps {
  // 受控组件
  value: number;
  // 容器类名，用以覆盖内部
  className?: string;
  onChange?: (event: { detail: number }) => void;
}

type StepperProps = NeutralStepperProps & ExogenousStepperProps;

const DefaultStepperProps: NeutralStepperProps = {
  min: 1,
  max: Infinity,
  step: 1,
  integer: false,
  disabled: false,
  inputWith: '32px',
  buttonSize: '28px',
  showPlus: true,
  showMinus: true,
  disableMinus: false,
  disabledPlus: false,
  longPress: true,
  disableInput: false,
  decimalLength: 0,
};

/* vant-weapp hack */
// add num and avoid float number
function add(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

// TODO - Missing input manual
const Stepper: FunctionComponent<StepperProps> = (props) => {
  const {
    className,
    buttonSize,
    value,
    integer,
    disableInput,
    showMinus,
    step,
    showPlus,
    disabled,
    disabledPlus,
    disableMinus,
    decimalLength,
    max,
    min,
    onChange,
  } = props;
  const type = integer ? 'number' : 'digit';

  const stylesheets: Record<'button', CSSProperties> = {
    button: pickStyle({
      width: buttonSize,
      height: buttonSize,
    }),
  };

  // TODO - maximum detect
  const disability = {
    minus: disabled || disableMinus,
    input: disabled || disableInput,
    plus: disabled || disabledPlus,
  };
  const classnames = {
    container: clsx(className, 'van-stepper'),
    minus: clsx('van-stepper__minus', {
      'van-stepper__minus--disabled': disability.minus,
    }),
    input: clsx('van-stepper__input', {
      'van-stepper__input--disabled': disability.input,
    }),
    plus: clsx('van-stepper__plus', {
      'van-stepper__minus--disabled': disability.plus,
    }),
  };

  // 事件绑定
  const onClickFactory = (operation: 'minus' | 'plus') => () => {
    const diff = operation === 'minus' ? -step : step;
    const raw = add(value, diff);
    // 处理越界
    const next = Math.max(Math.min(max, raw), min);

    if (typeof onChange === 'function') {
      onChange({
        detail: next,
      });
    }
  };

  return (
    <View className={classnames.container}>
      <Select in={showMinus}>
        <View
          hoverClassName="van-stepper__plus--hover"
          hoverStayTime={70}
          style={stylesheets.button}
          className={classnames.minus}
          onClick={onClickFactory('minus')}
        />
      </Select>
      <Input
        type={type}
        style={stylesheets.button}
        className={classnames.input}
        disabled={disability.input}
        value={value}
      />
      <Select in={showPlus}>
        <View
          hoverClassName="van-stepper__plus--hover"
          hoverStayTime={70}
          style={stylesheets.button}
          className={classnames.plus}
          onClick={onClickFactory('plus')}
        />
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousStepperProps, NeutralStepperProps>(
  DefaultStepperProps
)(Stepper);
