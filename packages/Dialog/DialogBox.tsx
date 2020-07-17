// packages
import React, { FunctionComponent, CSSProperties, isValidElement } from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Popup from '../Popup';
import Button from '../Button';
import { Select } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
// self
import { DialogProps } from './Dialog.constant';
import './Dialog.css';

// scope
const DialogBox: FunctionComponent<DialogProps> = (props) => {
  const {
    className,
    visible,
    transition,
    width,
    zIndex,
    overlay,
    overlayStyle,
    style,
    title,
    message,
    messageAlign,
    showCancelButton,
    showConfirmButton,
    cancelButtonText,
    cancelButtonColor,
    cancelButtonLoading,
    confirmButtonText,
    confirmButtonColor,
    confirmButtonLoading,
  } = props;
  // event handlers
  const { onClickOverlay, onCancel, onConfirm } = props;
  // open type
  const {
    lang,
    sessionFrom,
    sendMessageTitle,
    sendMessageImg,
    sendMessagePath,
    showMessageCard,
    appParameter,
    openType,
    onGetUserInfo,
    onContact,
    onGetPhoneNumber,
    onError,
    onLaunchApp,
    onOpenSetting,
  } = props;

  const classnames = {
    container: clsx(className, 'van-dialog'),
    title: clsx('van-dialog__header', {
      'van-dialog__header--isolated': !message,
    }),
    message: clsx(
      'van-dialog__message',
      `van-dialog__message--${messageAlign}`,
      {
        'van-dialog__message--has-title': !!title,
      }
    ),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      ...(style || {}),
      width,
    },
    cancel: pickStyle({
      color: cancelButtonColor,
    }),
    confirm: pickStyle({
      color: confirmButtonColor,
    }),
  };

  return (
    <Popup
      visible={visible}
      transition={transition}
      overlay={overlay}
      overlayStyle={overlayStyle}
      zIndex={zIndex}
      position="center"
      style={stylesheets.container}
      className={classnames.container}
      onClickOverlay={onClickOverlay}
    >
      <Select in={!!title}>
        <View className={classnames.title}>{title}</View>
      </Select>
      <Select in={typeof message === 'string'}>
        <View className={classnames.message}>
          <Text className="van-dialog__message-text">{message}</Text>
        </View>
      </Select>
      <Select in={isValidElement(message)}>{message}</Select>

      <View className="van-hairline--top van-dialog__footer">
        <Select in={showCancelButton}>
          <View className="van-dialog__button van-hairline--right">
            <Button
              size="large"
              className="van-dialog__cancel"
              style={stylesheets.cancel}
              loading={cancelButtonLoading}
              onClick={onCancel}
            >
              {cancelButtonText}
            </Button>
          </View>
        </Select>
        <Select in={showConfirmButton}>
          <View className="van-dialog__button">
            <Button
              size="large"
              className="van-dialog__confirm"
              style={stylesheets.confirm}
              loading={confirmButtonLoading}
              openType={openType}
              lang={lang}
              appParameter={appParameter}
              sessionFrom={sessionFrom}
              sendMessageTitle={sendMessageTitle}
              sendMessageImg={sendMessageImg}
              sendMessagePath={sendMessagePath}
              showMessageCard={showMessageCard}
              onClick={onConfirm}
              onGetUserInfo={onGetUserInfo}
              onContact={onContact}
              onGetPhoneNumber={onGetPhoneNumber}
              onError={onError}
              onLaunchApp={onLaunchApp}
              onOpenSetting={onOpenSetting}
            >
              {confirmButtonText}
            </Button>
          </View>
        </Select>
      </View>
    </Popup>
  );
};

export default DialogBox;
