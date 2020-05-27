// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View, Image } from 'remax/wechat';
// internal
import Info from '../Info';
import './Icon.css';

interface IconProps {
  // 移植属性
  name: string;
  dot?: boolean;
  color?: string;
  size?: string;
  onClick?: (event: any) => void;
  // info#info
  message?: string;
  // info#customStyle
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}

const Icon: FunctionComponent<IconProps> = (props) => {
  const { className, dot, message, style, name, color, size, onClick } = props;

  const external = name.indexOf('/') !== -1;
  // UI property
  const classnames = {
    container: clsx(className, 'van-icon', {
      'van-icon--image': external,
      [`van-icon-${name}`]: !external,
    }),
  };
  const stylesheets: Record<'container', CSSProperties> = {
    container: style
      ? {
          ...style,
          color,
          fontSize: size,
        }
      : {
          color,
          fontSize: size,
        },
  };
  // inside image
  const Insider = external && (
    <Image mode="aspectFit" className="van-icon__image" src={name} />
  );

  return (
    <View
      style={stylesheets.container}
      className={classnames.container}
      onClick={onClick}
    >
      <Info className="van-icon__info" dot={dot} message={message} />
      {Insider}
    </View>
  );
};

export default Icon;
