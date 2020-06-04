// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View, Image } from 'remax/wechat';
// internal
import Info from '../Info';
import { Select } from '../tools/Switch';
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

// TODO - re-implement icon example page to be consistent with official page

// Changes:
//  1. remove class prefix;
//  2. drop inline style value number support;
const Icon: FunctionComponent<IconProps> = (props) => {
  const { className, dot, info, style, name, color, size, onClick } = props;
  const external = name.indexOf('/') !== -1;
  const classnames = {
    container: clsx(className, 'van-icon', {
      'van-icon--image': external,
      [`van-icon-${name}`]: !external,
    }),
  };
  const stylesheet: CSSProperties = pickStyle(
    // shortcut method, use assign method resolve undefined style property
    // eslint-disable-next-line prefer-object-spread
    Object.assign({}, style, {
      color,
      fontSize: size,
    })
  );
  const visibility = {
    info: info !== null || dot,
    image: external,
  };

  return (
    <View style={stylesheet} className={classnames.container} onClick={onClick}>
      <Select in={visibility.info}>
        <Info className="van-icon__info" dot={dot} info={info} />
      </Select>
      <Select in={visibility.image}>
        <Image mode="aspectFit" className="van-icon__image" src={name} />
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousIconProps, NeutralIconProps>(
  DefaultIconProps
)(Icon);
