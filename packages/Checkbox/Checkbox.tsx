// packages
import React, {
  FunctionComponent,
  useContext,
  CSSProperties,
  ReactElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import CheckboxGroupContext, {
  CheckboxChangeEvent,
} from '../CheckboxGroup/CheckboxGroupContext';
import { Switch, Case } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Checkbox.css';

// 默认值填充属性
interface NeutralCheckboxProps {
  shape: 'round' | 'square';
  value: boolean;
  disabled: boolean;
  labelDisabled: boolean;
  labelPosition: 'left' | 'right';
  checkedColor: string;
  iconSize: string;
}

interface ExogenousCheckboxProps {
  // 自定义图标
  icon?: ReactElement;
  // 唯一标示
  name: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onChange?: (event: CheckboxChangeEvent) => void;
}

type CheckboxProps = NeutralCheckboxProps & ExogenousCheckboxProps;

const DefaultCheckboxProps: NeutralCheckboxProps = {
  shape: 'round',
  value: false,
  disabled: false,
  labelDisabled: false,
  labelPosition: 'right',
  checkedColor: '#1989fa',
  iconSize: '20px;',
};

const Checkbox: FunctionComponent<CheckboxProps> = (props) => {
  const {
    labelPosition,
    labelDisabled,
    checkedColor,
    icon,
    iconSize,
    name,
    shape,
    className,
    children,
    value,
    onChange,
    disabled: _disabled1,
  } = props;
  // const { isChecked, onChange, disabled: _disabled2 } = useContext(
  //   CheckboxGroupContext
  // );
  const context = useContext(CheckboxGroupContext);

  // derivation, fuse standalone and CheckboxGroup usage
  const disabled = _disabled1 || context?.disabled;
  const checked = context ? context?.isChecked(name) : value;
  const color = checked && !disabled ? checkedColor : undefined;

  // binding
  const classnames = {
    container: clsx(className, 'van-checkbox'),
    label: clsx(
      'van-checkbox__label',
      `van-checkbox__label--${labelPosition}`,
      {
        'van-checkbox__label--disabled': disabled,
      }
    ),
    iconParent: clsx('van-checkbox__icon', `van-checkbox__icon--${shape}`, {
      'van-checkbox__icon--disabled': disabled,
      'van-checkbox__icon--checked': checked,
    }),
  };
  const stylesheets: Record<string, CSSProperties> = {
    iconParent: pickStyle({
      fontSize: iconSize,
      borderColor: color,
      backgroundColor: color,
    }),
    icon: {
      lineHeight: '1.25em',
    },
  };
  const visibility = {
    customIcon: !!icon,
  };

  // 事件绑定
  const onChangeWrap = context?.onChange || onChange;
  const onClick = () => {
    if (!disabled) {
      if (typeof onChangeWrap === 'function') {
        onChangeWrap({
          name,
          status: !checked,
        });
      }
    }
  };
  const onClickLabel = () => {
    if (!disabled && !labelDisabled) {
      if (typeof onChangeWrap === 'function') {
        onChangeWrap({
          name,
          status: !checked,
        });
      }
    }
  };

  return (
    <View className={classnames.container}>
      <View className="van-checkbox__icon-wrap" onClick={onClick}>
        <View className={classnames.iconParent} style={stylesheets.iconParent}>
          <Switch>
            <Case in={visibility.customIcon}>{icon}</Case>
            <Case default>
              <Icon name="success" size=".8em" style={stylesheets.icon} />
            </Case>
          </Switch>
        </View>
      </View>
      <View className={classnames.label} onClick={onClickLabel}>
        {children}
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousCheckboxProps, NeutralCheckboxProps>(
  DefaultCheckboxProps
)(Checkbox);
