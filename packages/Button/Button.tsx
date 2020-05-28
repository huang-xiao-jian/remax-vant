// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactElement,
  cloneElement,
} from 'react';
import clsx from 'clsx';
import {
  Button as WechatButton,
  ButtonProps as WechatButtonProps,
  View,
} from 'remax/wechat';
// internal
import Loading from '../Loading';
import withDefaultProps from '../tools/with-default-props-advance';
import './Button.css';

// TODO - 遗漏 id, business-id, dataset 三属性，功能位置，待确认

// 默认值填充属性
interface NeutralButtonProps {
  // 移植属性
  plain: boolean;
  block: boolean;
  round: boolean;
  square: boolean;
  loading: boolean;
  hairline: boolean;
  disabled: boolean;
  type: 'default' | 'primary' | 'info' | 'warning' | 'danger';
  size: 'normal' | 'large' | 'small' | 'mini';
  // 直接传递 loading 组件，不再进行属性透传
  loader: ReactElement;
}

// 不包含默认值属性
interface ExogenousButtonProps {
  loadingText?: string;
  color?: string;
  // 新增属性
  // 直接传递 icon，不再进行属性透传
  icon?: ReactElement;
  // host button property
  hoverClassName?: string;
  // 容器类名，用以覆盖内部
  className?: string;
}

type HostButtonProps = Pick<
  WechatButtonProps,
  | 'lang'
  | 'sessionFrom'
  | 'sendMessageTitle'
  | 'sendMessagePath'
  | 'sendMessageImg'
  | 'appParameter'
  | 'showMessageCard'
  | 'onGetUserInfo'
  | 'onContact'
  | 'onGetPhoneNumber'
  | 'onError'
  | 'onLaunchApp'
  | 'onOpenSetting'
>;
type ButtonProps = NeutralButtonProps & ExogenousButtonProps & HostButtonProps;

// scope
const DefaultButtonProps: NeutralButtonProps = {
  type: 'default',
  size: 'normal',
  plain: false,
  block: false,
  round: false,
  square: false,
  loading: false,
  hairline: false,
  disabled: false,
  loader: <Loading type="circular" size="20px" />,
};

const deriveHostButtonStyle = (color: string, plain: boolean) => {
  const style: CSSProperties = {};

  if (color) {
    style.color = plain ? color : '#ffffff';

    // Use background instead of backgroundColor to make linear-gradient work
    if (!plain) {
      style.background = color;
    }

    // hide border when color is linear-gradient
    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  return style;
};

const Button: FunctionComponent<ButtonProps> = (props) => {
  const {
    className,
    hoverClassName,
    type,
    size,
    block,
    round,
    plain,
    square,
    loading,
    disabled,
    hairline,
    color,
    icon,
    loader,
    loadingText,
    children,
  } = props;
  const unclickable = disabled || loading;
  /* prettier-ignore */
  /* eslint-disable no-nested-ternary */
  const loadingColor = plain
    ? (color ?? '#c9c9c9')
    : (type === 'default' ? '#c9c9c9': '#ffffff');
  const loadingHolder =
    loader &&
    cloneElement(loader, {
      color: loadingColor,
    });
  const loadingTextHolder = loadingText && (
    <View className="van-button__loading-text">{loadingText}</View>
  );
  const iconHolder =
    icon &&
    cloneElement(icon, {
      size: '1.2em',
      className: 'van-button__icon',
    });
  const staticHolder = <View className="van-button__text">{children}</View>;

  // UI property
  const classnames = {
    container: clsx(
      className,
      'van-button',
      `van-button--${type}`,
      `van-button--${size}`,
      {
        'van-button--block': block,
        'van-button--round': round,
        'van-button--plain': plain,
        'van-button--square': square,
        'van-button--loading': loading,
        'van-button--disabled': disabled,
        'van-button--hairline': hairline,
        'van-button--unclickable': unclickable,
        'van-hairline--surround': hairline,
      }
    ),
    hover: clsx(hoverClassName, 'van-button--active'),
  };
  const stylesheets: Record<'container', CSSProperties> = {
    container: deriveHostButtonStyle(color, plain),
  };

  return (
    <WechatButton
      style={stylesheets.container}
      className={classnames.container}
      hoverClassName={classnames.hover}
    >
      {loading && loadingHolder}
      {loading && loadingTextHolder}
      {!loading && iconHolder}
      {!loading && staticHolder}
    </WechatButton>
  );
};

export default withDefaultProps<
  ExogenousButtonProps & HostButtonProps,
  NeutralButtonProps
>(DefaultButtonProps)(Button);
