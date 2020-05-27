// packages
import React, { FunctionComponent, Fragment } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props';
import './CellGroup.css';

interface CellGroupProps {
  // 移植属性
  title?: string;
  border: boolean;
  // 改造新增属性
  // 容器类名，用以覆盖内部
  className?: string;
}

// scope
const DefaultCellGroupProps: CellGroupProps = {
  border: true,
};

const CellGroup: FunctionComponent<CellGroupProps> = (props) => {
  const { className, children, border, title } = props;
  const classnames = {
    container: clsx(className, 'van-cell-group', {
      'van-hairline--top-bottom': border,
    }),
  };
  const header = title && (
    <View className="van-cell-group__title">{title}</View>
  );
  const content = <View className={classnames.container}>{children}</View>;

  return (
    <Fragment>
      {header}
      {content}
    </Fragment>
  );
};

export default withDefaultProps(DefaultCellGroupProps)(CellGroup);
