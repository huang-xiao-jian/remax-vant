// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Button from '../Button';
import { OpenTypeMixin, ButtonMixin } from '../mixin';
import withDefaultProps from '../tools/with-default-props-advance';
import './GoodsActionButton.css';

interface NeutralGoodsActionButtonProps {
  type: 'default' | 'primary' | 'info' | 'warning' | 'danger';
  plain: boolean;
  loading: boolean;
  disabled: boolean;
}

interface ExogenousGoodsActionButtonProps {
  color?: string;
  text: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClick?: (event: any) => void;
}

interface ParentChildProp {
  mark?: 'first' | 'middle' | 'last';
}

type GoodsActionButtonProps = ExogenousGoodsActionButtonProps &
  NeutralGoodsActionButtonProps &
  ParentChildProp &
  OpenTypeMixin &
  ButtonMixin;

const DefaultGoodsActionButtonProps: NeutralGoodsActionButtonProps = {
  type: 'danger',
  disabled: false,
  loading: false,
  plain: false,
};

const GoodsActionButton: FunctionComponent<GoodsActionButtonProps> = (
  props
) => {
  const {
    className,
    color,
    text,
    plain,
    type,
    loading,
    disabled,
    children,
    mark,
    onClick,
  } = props;
  // open-type mixin
  const {
    openType,
    onContact,
    onError,
    onGetPhoneNumber,
    onGetUserInfo,
    onLaunchApp,
    onOpenSetting,
  } = props;
  // button mixin
  const {
    lang,
    sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    showMessageCard,
    appParameter,
  } = props;
  // core logical
  const classnames = {
    container: clsx(
      className,
      'van-goods-action-button',
      `van-goods-action-button--${type}`,
      {
        'van-goods-action-button--plain': plain,
        'van-goods-action-button--first': mark === 'first',
        'van-goods-action-button--last': mark === 'last',
      }
    ),
  };

  return (
    <View className={classnames.container}>
      <Button
        type={type}
        color={color}
        plain={plain}
        loading={loading}
        disabled={disabled}
        className="'van-goods-action-button__inner'"
        lang={lang}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        appParameter={appParameter}
        openType={openType}
        onClick={onClick}
        onContact={onContact}
        onError={onError}
        onGetPhoneNumber={onGetPhoneNumber}
        onGetUserInfo={onGetUserInfo}
        onLaunchApp={onLaunchApp}
        onOpenSetting={onOpenSetting}
      >
        {text}
        {children}
      </Button>
    </View>
  );
};

export default withDefaultProps<
  ExogenousGoodsActionButtonProps,
  NeutralGoodsActionButtonProps
>(DefaultGoodsActionButtonProps)(GoodsActionButton);
