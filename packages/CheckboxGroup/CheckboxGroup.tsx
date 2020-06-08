// packages
import React, { FunctionComponent } from 'react';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import CheckboxGroupContext, {
  CheckboxChangeEventDetail,
} from './CheckboxGroupContext';
import './CheckboxGroup.css';

// 默认值填充属性
interface NeutralCheckboxGroupProps {
  disabled: boolean;
}

interface ExogenousCheckboxGroupProps {
  name?: string;
  value: string[];
  max?: number;
  onChange?: (event: { detail: CheckboxChangeEventDetail }) => void;
}

type RadioGroupProps = NeutralCheckboxGroupProps & ExogenousCheckboxGroupProps;

const DefaultRadioGroupProps: NeutralCheckboxGroupProps = {
  disabled: false,
};

const CheckboxGroup: FunctionComponent<RadioGroupProps> = (props) => {
  const { disabled, value, onChange, children } = props;
  const payload = {
    disabled,
    value,
    onChange,
    isChecked: (name: string) => value.includes(name),
  };

  return (
    <CheckboxGroupContext.Provider value={payload}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export default withDefaultProps<
  ExogenousCheckboxGroupProps,
  NeutralCheckboxGroupProps
>(DefaultRadioGroupProps)(CheckboxGroup);
