// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Info.css';

interface InfoProps {
  // 移植属性
  dot?: boolean;
  info?: string;
  // 调整属性
  // info#customStyle
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}

const Info: FunctionComponent<InfoProps> = (props) => {
  const { className, dot, info, style } = props;

  if (info || dot) {
    const classnames = {
      container: clsx(className, 'van-info', {
        'van-info--dot': dot,
      }),
    };

    return (
      <View style={style} className={classnames.container}>
        {dot ? '' : info}
      </View>
    );
  }

  return null;
};

export default Info;
