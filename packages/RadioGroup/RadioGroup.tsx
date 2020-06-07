// packages
import React, { FunctionComponent } from 'react';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import RadioGroupContext from './RadioGroupContext';
import './RadioGroup.css';

// 默认值填充属性
interface NeutralRadioGroupProps {
  disabled: boolean;
}

interface ExogenousRadioGroupProps {
  name?: string;
  value: string;
  onChange?: (event: { detail: string }) => void;
}

type RadioGroupProps = NeutralRadioGroupProps & ExogenousRadioGroupProps;

const DefaultRadioGroupProps: NeutralRadioGroupProps = {
  disabled: false,
};

const RadioGroup: FunctionComponent<RadioGroupProps> = (props) => {
  const { disabled, value, onChange, children } = props;
  const payload = {
    disabled,
    value,
    onChange,
  };

  return (
    <RadioGroupContext.Provider value={payload}>
      {children}
    </RadioGroupContext.Provider>
  );
};

export default withDefaultProps<
  ExogenousRadioGroupProps,
  NeutralRadioGroupProps
>(DefaultRadioGroupProps)(RadioGroup);
