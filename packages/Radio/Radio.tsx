// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactNode,
  useContext,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import pickStyle from '../tools/pick-style';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './Radio.css';

// 默认值填充属性
interface NeutralRadioProps {
  shape: 'square' | 'round';
  disabled: boolean;
  labelDisabled: boolean;
  labelPosition: 'left' | 'right';
  iconSize: string;
  checkedColor: string;
}

interface ExogenousRadioProps {
  // 标识符
  name: string;
  // icon slot
  icon?: ReactNode;
  // 容器类名，用以覆盖内部
  className?: string;
}

type RadioProps = NeutralRadioProps & ExogenousRadioProps;

const DefaultRadioProps: NeutralRadioProps = {
  shape: 'round',
  disabled: false,
  labelDisabled: false,
  labelPosition: 'right',
  iconSize: '20px',
  checkedColor: '#1989fa',
};

const Radio: FunctionComponent<RadioProps> = (props) => {
  const { value, onChange, disabled: _disabled1 } = useContext(
    RadioGroupContext
  );

  const {
    labelPosition,
    labelDisabled,
    shape,
    iconSize,
    className,
    checkedColor,
    name,
    children,
    disabled: _disabled2,
  } = props;

  // derivation
  const disabled = _disabled1 || _disabled2;
  const color = !disabled && value === name ? checkedColor : undefined;

  // bindings
  const classnames = {
    container: clsx(className, 'van-radio'),
    label: clsx('van-radio__label', `van-radio__label--${labelPosition}`, {
      'van-radio__label--disabled': disabled,
    }),
    iconParent: clsx('van-radio__icon', `van-radio__icon--${shape}`, {
      'van-radio__icon--disabled': disabled,
      'van-radio__icon--checked': name === value,
    }),
  };
  const stylesheets: Record<
    'label' | 'iconWrap' | 'iconParent' | 'icon',
    CSSProperties
  > = {
    label: {
      fontSize: iconSize,
    },
    iconWrap: {
      fontSize: iconSize,
    },
    iconParent: pickStyle({
      fontSize: iconSize,
      borderColor: color,
      backgroundColor: color,
    }),
    icon: {
      display: 'block',
      fontSize: '.8em',
      lineHeight: iconSize,
    },
  };

  const onChangeWrap = () => {
    if (!disabled) {
      if (typeof onChange === 'function') {
        onChange({ detail: name });
      }
    }
  };
  const onClickLabelWrap = () => {
    if (!disabled && !labelDisabled) {
      if (typeof onChange === 'function') {
        onChange({ detail: name });
      }
    }
  };

  return (
    <View className={classnames.container}>
      <Select in={labelPosition === 'left'}>
        <View className={classnames.label} onClick={onClickLabelWrap}>
          {children}
        </View>
      </Select>
      <View
        className="van-radio__icon-wrap"
        style={stylesheets.iconWrap}
        onClick={onChangeWrap}
      >
        <View style={stylesheets.iconParent} className={classnames.iconParent}>
          <Icon name="success" style={stylesheets.icon} />
        </View>
      </View>
      <Select in={labelPosition === 'right'}>
        <View className={classnames.label} onClick={onClickLabelWrap}>
          {children}
        </View>
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousRadioProps, NeutralRadioProps>(
  DefaultRadioProps
)(Radio);
