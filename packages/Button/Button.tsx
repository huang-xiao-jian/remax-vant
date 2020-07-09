// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { Button as WechatButton, View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import Loading from '../Loading';
import { OpenTypeMixin, ButtonMixin } from '../mixin';
import { deriveStyle, pickColor } from './wxs';
import { Switch, Case, Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './Button.css';

// TODO - 遗漏 id, business-id, dataset 三属性，功能位置，待确认

export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger';
export type ButtonSize = 'normal' | 'large' | 'small' | 'mini';

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
  loadingType: 'circular' | 'spinner';
  loadingSize: string;
  type: ButtonType;
  size: ButtonSize;
}

// 不包含默认值属性
interface ExogenousButtonProps {
  loadingText?: string;
  color?: string;
  dataset?: DOMStringMap;
  // 新增属性
  // 直接传递 icon，不再进行属性透传
  icon?: string;
  // host button property
  hoverClassName?: string;
  // 自定义扩充
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClick?: (event: any) => void;
}

export type ButtonProps = NeutralButtonProps &
  ExogenousButtonProps &
  OpenTypeMixin &
  ButtonMixin;

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
  loadingType: 'circular',
  loadingSize: '20px',
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
    style = {},
    loadingText,
    children,
    dataset,
    onClick,
  } = props;

  // UI property
  const unclickable = disabled || loading;
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
  const stylesheets: Record<string, CSSProperties> = {
    container: { ...style, ...deriveStyle(color, plain) },
    icon: { lineHeight: 'inherit' },
  };
  // 事件绑定
  const onClickWrap = (event: any) => {
    if (!disabled) {
      if (typeof onClick === 'function') {
        onClick(event);
      }
    }
  };

  // direct binding
  const { loadingSize, loadingType } = props;
  const visibility = {
    loadingText: typeof loadingText === 'string',
    icon: typeof icon === 'string',
  };
  // mixin
  const {
    lang,
    openType,
    sessionFrom,
    sendMessageTitle,
    sendMessageImg,
    sendMessagePath,
    showMessageCard,
    appParameter,
  } = props;
  const {
    onGetUserInfo,
    onContact,
    onGetPhoneNumber,
    onError,
    onLaunchApp,
    onOpenSetting,
  } = props;

  return (
    <WechatButton
      style={stylesheets.container}
      className={classnames.container}
      hoverClassName={classnames.hover}
      dataset={dataset}
      lang={lang}
      openType={openType}
      sessionFrom={sessionFrom}
      sendMessageTitle={sendMessageTitle}
      sendMessagePath={sendMessagePath}
      sendMessageImg={sendMessageImg}
      showMessageCard={showMessageCard}
      appParameter={appParameter}
      onClick={onClickWrap}
      onGetUserInfo={onGetUserInfo}
      onContact={onContact}
      onGetPhoneNumber={onGetPhoneNumber}
      onError={onError}
      onLaunchApp={onLaunchApp}
      onOpenSetting={onOpenSetting}
    >
      <Switch>
        <Case in={loading}>
          <Loading
            size={loadingSize}
            type={loadingType}
            color={pickColor(type, color, plain)}
          />
          <Select in={visibility.loadingText}>
            <View className="van-button__loading-text">{loadingText}</View>
          </Select>
        </Case>
        <Case default>
          <Select in={visibility.icon}>
            <Icon
              size="1.2em"
              name={icon as string}
              className="van-button__icon"
              style={stylesheets.icon}
            />
          </Select>
          <View className="van-button__text">{children}</View>
        </Case>
      </Switch>
    </WechatButton>
  );
};

export default withDefaultProps<
  ExogenousButtonProps & OpenTypeMixin & ButtonMixin,
  NeutralButtonProps
>(DefaultButtonProps)(Button);
