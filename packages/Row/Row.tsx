// packages
import React, {
  FunctionComponent,
  CSSProperties,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Row.css';

interface RowProps {
  // 移植属性
  gutter?: number;
  // 容器类名，用以覆盖内部
  className?: string;
}

const Row: FunctionComponent<RowProps> = (props) => {
  const { className, children: originChildren, gutter } = props;
  const classnames = {
    container: clsx(className, 'van-row'),
  };
  const style: CSSProperties = gutter
    ? {
        marginLeft: `${gutter / 2}px`,
        marginRight: `${gutter / 2}px`,
      }
    : {};
  // maybe influence performance, find out later
  const children = Children.map(originChildren, (element) =>
    isValidElement(element)
      ? cloneElement(element as ReactElement, { gutter })
      : element
  );

  return (
    <View style={style} className={classnames.container}>
      {children}
    </View>
  );
};

export default Row;
