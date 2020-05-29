// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import './Divider.css';

// 默认值填充属性
interface NeutralDividerProps {
  dashed: boolean;
  hairline: boolean;
}

interface ExogenousDividerProps {
  contentPostion?: 'left' | 'center' | 'right';
  // 自定义样式
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}

type DividerProps = NeutralDividerProps & ExogenousDividerProps;

const DefaultDividerProps: NeutralDividerProps = {
  dashed: false,
  hairline: false,
};

const Divider: FunctionComponent<DividerProps> = (props) => {
  const {
    style,
    className,
    dashed,
    hairline,
    contentPostion,
    children,
  } = props;
  const classnames = {
    container: clsx(
      className,
      'van-divider',
      contentPostion && `van-divider--${contentPostion}`,
      {
        'van-divider--dashed': dashed,
        'van-divider--hairline': hairline,
      }
    ),
  };

  return (
    <View style={style} className={classnames.container}>
      {children}
    </View>
  );
};

export default withDefaultProps<ExogenousDividerProps, NeutralDividerProps>(
  DefaultDividerProps
)(Divider);
