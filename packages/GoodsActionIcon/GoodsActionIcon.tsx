// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import { OpenTypeMixin, ButtonMixin } from '../mixin';
import Button from '../Button';
import Icon from '../Icon';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './GoodsActionIcon.css';

// 默认值填充属性
interface NeutralGoodsActionIconProps {
  disabled: boolean;
  loading: boolean;
}

interface ExogenousGoodsActionIconProps {
  text: string;
  icon: string;
  info?: string;
  dot?: boolean;
  // 容器类名，用以覆盖内部
  className?: string;
}

type GoodsActionIconProps = NeutralGoodsActionIconProps &
  ExogenousGoodsActionIconProps &
  OpenTypeMixin &
  ButtonMixin;

const DefaultGoodsActionIconProps: NeutralGoodsActionIconProps = {
  disabled: false,
  loading: false,
};

const GoodsActionIcon: FunctionComponent<GoodsActionIconProps> = (props) => {
  // pick
  const {
    className,
    icon,
    loading,
    disabled,
    text,
    dot,
    info,
    children,
    ...rest
  } = props;
  const classnames = {
    container: clsx(className, 'van-goods-action-icon'),
  };
  const visibility = {
    icon: typeof icon === 'string',
  };

  return (
    <Button
      square
      size="large"
      loading={loading}
      disabled={disabled}
      className={classnames.container}
      // only spread mixin props
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <View className="van-goods-action-icon__content">
        <Select in={visibility.icon}>
          <View className="van-goods-action-icon__icon">
            <Icon size="20px" name={icon} dot={dot} info={info} />
          </View>
        </Select>
        <Text>{text}</Text>
      </View>
    </Button>
  );
};

export default withDefaultProps<
  ExogenousGoodsActionIconProps,
  NeutralGoodsActionIconProps
>(DefaultGoodsActionIconProps)(GoodsActionIcon);
