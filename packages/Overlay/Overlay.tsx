// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Transition from '../Transition';
import withDefaultProps from '../tools/with-default-props-advance';
import './Overlay.css';

// 默认值填充属性
interface NeutralOverlayProps {
  visible: boolean;
  zIndex: number;
  // 数字单位 ms
  duration: string | number;
}

interface ExogenousOverlayProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 自定义内嵌样式
  style?: CSSProperties;
  // 事件绑定
  onClick?: () => void;
}

type OverlayProps = NeutralOverlayProps & ExogenousOverlayProps;

// scope
const DefaultOverlayProps: NeutralOverlayProps = {
  visible: false,
  zIndex: 1,
  duration: 300,
};

const Overlay: FunctionComponent<OverlayProps> = (props) => {
  const {
    className,
    visible,
    duration,
    style,
    zIndex,
    children,
    onClick,
  } = props;
  const classnames = {
    container: clsx(className, 'van-overlay'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: style ? { ...style, zIndex } : { zIndex },
  };

  return (
    <Transition
      visible={visible}
      duration={duration}
      style={stylesheets.container}
      className={classnames.container}
      onClick={onClick}
    >
      {children}
    </Transition>
  );
};

export default withDefaultProps<ExogenousOverlayProps, NeutralOverlayProps>(
  DefaultOverlayProps
)(Overlay);
