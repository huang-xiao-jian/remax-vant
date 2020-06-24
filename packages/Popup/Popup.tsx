// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Overlay from '../Overlay';
import Transition from '../Transition';
import Icon from '../Icon';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './Popup.css';

// 默认值填充属性
interface NeutralPopupProps {
  visible: boolean;
  zIndex: number;
  overlay: boolean;
  position: 'top' | 'right' | 'bottom' | 'left' | 'center';
  duration: number;
  round: boolean;
  closable: boolean;
  closeIcon: string;
  closeIconPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  safeAreaInsetBottom: boolean;
  safeAreaInsetTop: boolean;
}

interface ExogenousPopupProps {
  style?: CSSProperties;
  overlayStyle?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onClickOverlay?: () => void;
  // 点击关闭 icon 触发
  onClose?: () => void;
}

type PopupProps = NeutralPopupProps & ExogenousPopupProps;

// scope
const DefaultPopupProps: NeutralPopupProps = {
  visible: false,
  zIndex: 100,
  overlay: true,
  position: 'center',
  duration: 300,
  round: false,
  closable: false,
  closeIcon: 'cross',
  closeIconPosition: 'top-right',
  safeAreaInsetBottom: true,
  safeAreaInsetTop: false,
};

const Popup: FunctionComponent<PopupProps> = (props) => {
  const {
    className,
    overlay,
    visible,
    zIndex,
    duration,
    position,
    overlayStyle,
    round,
    safeAreaInsetBottom,
    safeAreaInsetTop,
    style,
    children,
    closable,
    closeIcon,
    closeIconPosition,
    onClose,
    onClickOverlay,
  } = props;
  const classnames = {
    container: clsx(className, 'van-popup', `van-popup--${position}`, {
      'van-popup--round': round,
      'van-popup--safe': safeAreaInsetBottom,
      'van-popup--safeTop': safeAreaInsetTop,
    }),
    icon: clsx(
      'van-popup__close-icon',
      `van-popup__close-icon--${closeIconPosition}`
    ),
  };
  const stylesheets: Record<string, CSSProperties> = {
    transition: style ? { ...style, zIndex } : { zIndex },
  };

  return (
    <>
      <Overlay
        visible={visible && overlay}
        zIndex={zIndex}
        duration={duration}
        style={overlayStyle}
        onClick={onClickOverlay}
      />
      <Transition
        name={`van-popup-${position}`}
        style={stylesheets.transition}
        visible={visible}
        duration={duration}
        className={classnames.container}
      >
        {children}
        <Select in={closable}>
          <Icon
            name={closeIcon}
            className={classnames.icon}
            onClick={onClose}
          />
        </Select>
      </Transition>
    </>
  );
};

export default withDefaultProps<ExogenousPopupProps, NeutralPopupProps>(
  DefaultPopupProps
)(Popup);
