// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './CellGroup.css';

// 默认值填充属性
interface NeutralCellGroupProps {
  border: boolean;
}

interface ExogenousCellGroupProps {
  // 移植属性
  title?: string;
  // 容器类名，用以覆盖内部
  className?: string;
}

type CellGroupProps = ExogenousCellGroupProps & NeutralCellGroupProps;

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

  const visibility = {
    title: typeof title === 'string',
  };

  return (
    <>
      <Select in={visibility.title}>
        <View className="van-cell-group__title">{title}</View>
      </Select>
      <View className={classnames.container}>{children}</View>
    </>
  );
};

export default withDefaultProps<ExogenousCellGroupProps, NeutralCellGroupProps>(
  DefaultCellGroupProps
)(CellGroup);
