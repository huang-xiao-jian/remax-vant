// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import { Select } from '../tools/Switch';
import './Progress.css';

// 默认值填充属性
interface NeutralProgressProps {
  inactive: boolean;
  percentage: number;
  strokeWidth: string;
  showPivot: boolean;
  color: string;
  textColor: string;
  trackColor: string;
}

interface ExogenousProgressProps {
  pivotText?: string;
  pivotColor?: string;
  // 容器类名，用以覆盖内部
  className?: string;
}

type ProgressProps = NeutralProgressProps & ExogenousProgressProps;

const DefaultProgressProps: NeutralProgressProps = {
  inactive: false,
  percentage: 0,
  strokeWidth: '4px',
  showPivot: true,
  color: '#1989fa',
  textColor: '#fff',
  trackColor: '#e5e5e5',
};

const Progress: FunctionComponent<ProgressProps> = (props) => {
  const {
    className,
    percentage,
    strokeWidth,
    inactive,
    color,
    trackColor,
    textColor,
    pivotColor,
    showPivot,
    pivotText,
  } = props;
  const classnames = {
    container: clsx(className, 'van-progress'),
    tracker: 'van-progress__portion',
  };
  const style: Record<string, CSSProperties> = {
    container: {
      height: strokeWidth,
      background: trackColor,
    },
    tracker: {
      width: `${percentage}%`,
      background: inactive ? '#cacaca' : color,
    },
    censor: {
      color: textColor,
      background: pivotColor ?? (inactive ? '#cacaca' : color),
    },
  };

  return (
    <View style={style.container} className={classnames.container}>
      <View style={style.tracker} className={classnames.tracker}>
        <Select in={showPivot}>
          <View style={style.censor} className="van-progress__pivot">
            {pivotText ?? `${percentage}%`}
          </View>
        </Select>
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousProgressProps, NeutralProgressProps>(
  DefaultProgressProps
)(Progress);
