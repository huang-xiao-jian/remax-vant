// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Loading from '../Loading';
import { Select } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Switch.css';

// 默认值填充属性
interface NeutralSwitchProps {
  checked: any;
  loading: boolean;
  disabled: boolean;
  size: string;
  activeColor: string;
  inactiveColor: string;
  activeValue: any;
  inactiveValue: any;
}

interface ExogenousSwitchProps {
  name?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onChange?: (event: any) => void;
}

type SwitchProps = NeutralSwitchProps & ExogenousSwitchProps;

const DefaultSwitchProps: NeutralSwitchProps = {
  checked: false,
  loading: false,
  disabled: false,
  size: '30px',
  activeColor: '#1989fa',
  inactiveColor: '#969799',
  activeValue: true,
  inactiveValue: false,
};

const Switch: FunctionComponent<SwitchProps> = (props) => {
  const {
    checked,
    size,
    disabled,
    loading,
    activeColor,
    activeValue,
    inactiveColor,
    inactiveValue,
    className,
    onChange,
  } = props;
  const classnames = {
    container: clsx(className, 'van-switch', {
      'van-switch--disabled': disabled,
      'van-switch--on': checked === activeValue,
    }),
  };
  const style: CSSProperties = pickStyle({
    fontSize: size,
    backgroundColor: checked ? activeColor : inactiveColor,
  });
  const loadingColor = checked ? activeColor : inactiveColor;
  const onClick = () => {
    if (!disabled && !loading) {
      const value = checked === activeValue ? inactiveValue : activeValue;

      if (typeof onChange === 'function') {
        onChange({ detail: value });
      }
    }
  };

  return (
    <View className={classnames.container} style={style} onClick={onClick}>
      <View className="van-switch__node">
        <Select in={loading}>
          <Loading color={loadingColor} className="van-switch__loading" />
        </Select>
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousSwitchProps, NeutralSwitchProps>(
  DefaultSwitchProps
)(Switch);
