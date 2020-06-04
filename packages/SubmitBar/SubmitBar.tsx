// packages
import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Button from '../Button';
import { ButtonType } from '../Button/Button';
import Icon from '../Icon';
import withDefaultProps from '../tools/with-default-props-advance';
import { Select, Switch, Case } from '../tools/Switch';
import './SubmitBar.css';

// 默认值填充属性
interface NeutralSubmitBarProps {
  label: string;
  currency: string;
  decimalLength: number;
  safeAreaInsetBottom: boolean;
  // button
  loading: boolean;
  disabled: boolean;
  buttonType: ButtonType;
}

interface ExogenousSubmitBarProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // tip block
  tip?: ReactNode;
  tipIcon?: string;
  // 推荐精确到分
  price: number;
  suffixLabel?: string;
  // button
  buttonText: string;
  onSubmit?: (event: any) => void;
}

type SubmitBarProps = NeutralSubmitBarProps & ExogenousSubmitBarProps;

// scope
const DefaultSubmitBarProps: NeutralSubmitBarProps = {
  label: '合计：',
  currency: '¥',
  decimalLength: 2,
  buttonType: 'danger',
  safeAreaInsetBottom: true,
  loading: false,
  disabled: false,
};

// Changes:
//  1. remove top slot;
//  2. remove tip slot;

// TODO - determine submit event when loading
const SubmitBar: FunctionComponent<SubmitBarProps> = (props) => {
  const {
    className,
    tip,
    tipIcon,
    label,
    price,
    decimalLength,
    currency,
    suffixLabel,
    buttonText,
    buttonType,
    loading,
    disabled,
    safeAreaInsetBottom,
    children,
    onSubmit,
  } = props;
  const classnames = {
    container: clsx(className, 'van-submit-bar'),
  };

  // derivation
  const priceStrArr =
    typeof price === 'number' &&
    (price / 100).toFixed(decimalLength).split('.');
  const derivation = {
    hasTip: typeof tip === 'string',
    hasPrice: typeof price === 'number',
    integerStr: priceStrArr && priceStrArr[0],
    decimalStr: decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '',
  };

  return (
    <View className={classnames.container}>
      {/* tip block */}
      <View className="van-submit-bar__tip">
        <Select in={!!tipIcon}>
          <Icon
            size="12px"
            name={tipIcon as string}
            className="van-submit-bar__tip-icon"
          />
        </Select>
        <Switch>
          <Case in={derivation.hasTip}>
            <View className="van-submit-bar__tip-text">{tip}</View>
          </Case>
          <Case default>{tip}</Case>
        </Switch>
      </View>
      {/* content block */}
      <View className="van-submit-bar__bar">
        {children}
        <Select in={derivation.hasPrice}>
          <View className="van-submit-bar__text">
            <Text>{label}</Text>
            <Text className="van-submit-bar__price price-class">
              <Text className="van-submit-bar__currency">{currency} </Text>
              <Text className="van-submit-bar__price-integer">
                {derivation.integerStr}
              </Text>
              <Text>{derivation.decimalStr}</Text>
            </Text>
            <Text className="van-submit-bar__suffix-label">{suffixLabel}</Text>
          </View>
        </Select>

        <Button
          round
          type={buttonType}
          loading={loading}
          disabled={disabled}
          className="van-submit-bar__button"
          onClick={onSubmit}
        >
          {loading ? '' : buttonText}
        </Button>
      </View>
      {/* safe area placeholder */}
      <Select in={safeAreaInsetBottom}>
        <View className="van-submit-bar__safe" />
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousSubmitBarProps, NeutralSubmitBarProps>(
  DefaultSubmitBarProps
)(SubmitBar);
