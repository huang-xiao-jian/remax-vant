// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Col.css';

interface ColProps {
  // 移植属性
  span?: number;
  offset?: number;
  // 改造新增属性，由 Parent Row 传递
  gutter?: number;
  // 容器类名，用以覆盖内部
  className?: string;
}

const Col: FunctionComponent<ColProps> = (props) => {
  const { className, children, span, offset, gutter } = props;
  const classnames = {
    container: clsx(className, 'van-col', {
      [`van-col--${span}`]: span,
      [`van-col--offset-${offset}`]: offset,
    }),
  };
  const style: CSSProperties = gutter
    ? {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      }
    : {};

  return (
    <View style={style} className={classnames.container}>
      {children}
    </View>
  );
};

export default Col;
