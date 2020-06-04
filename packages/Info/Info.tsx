// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { Select } from '../tools/Switch';
import './Info.css';

interface InfoProps {
  // 移植属性
  dot?: boolean;
  info?: string;
  // info#customStyle
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}

const Info: FunctionComponent<InfoProps> = (props) => {
  const { className, dot, info, style } = props;
  // 原始版本 wx:if 判断条件
  const oin = (info !== null && info !== '') || dot;

  const classnames = {
    container: clsx(className, 'van-info', {
      'van-info--dot': dot,
    }),
  };

  return (
    <Select in={oin}>
      <View style={style} className={classnames.container}>
        {dot ? '' : info}
      </View>
    </Select>
  );
};

export default Info;
