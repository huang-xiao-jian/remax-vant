// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View, Image } from 'remax/wechat';
// internal
import Info from '../Info';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './Icon.css';

// 默认值填充属性
interface NeutralIconProps {
  dot: boolean;
  color: string;
  size: string;
}
// 不包含默认值属性
interface ExogenousIconProps {
  name: string;
  // info#info
  info?: string;
  // info#customStyle
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClick?: (event: any) => void;
}

type IconProps = NeutralIconProps & ExogenousIconProps;

// scope
const DefaultIconProps: NeutralIconProps = {
  dot: false,
  color: 'inherit',
  size: 'inherit',
};

const Icon: FunctionComponent<IconProps> = (props) => {
  const { className, dot, info, style, name, color, size, onClick } = props;

  const external = name.indexOf('/') !== -1;
  const classnames = {
    container: clsx(className, 'van-icon', {
      'van-icon--image': external,
      [`van-icon-${name}`]: !external,
    }),
  };
  const stylesheets: Record<'container', CSSProperties> = {
    // void style value will be ignored
    // eslint-disable-next-line prefer-object-spread
    container: Object.assign({}, style, {
      color,
      fontSize: size,
    }),
  };
  // inside image
  const Insider = external && (
    <Image mode="aspectFit" className="van-icon__image" src={name} />
  );

  return (
    <View
      style={pickStyle(stylesheets.container)}
      className={classnames.container}
      onClick={onClick}
    >
      <Info className="van-icon__info" dot={dot} info={info} />
      {Insider}
    </View>
  );
};

export default withDefaultProps<ExogenousIconProps, NeutralIconProps>(
  DefaultIconProps
)(Icon);
