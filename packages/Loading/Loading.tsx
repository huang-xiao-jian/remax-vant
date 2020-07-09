// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { Select } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Loading.css';

// 默认值填充部分
interface NeutralLoadingProps {
  color?: string;
  vertical: boolean;
  type: 'spinner' | 'circular';
  size?: string;
  textSize?: string;
}

interface ExogenousLoadingProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

type LoadingProps = ExogenousLoadingProps & NeutralLoadingProps;

const DefaultLoadingProps: NeutralLoadingProps = {
  color: '#c9c9c9',
  type: 'circular',
  size: '30px',
  textSize: '14px',
  vertical: false,
};

const Dots: FunctionComponent = () => (
  <>
    {Array.from({ length: 12 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <View className="van-loading__dot" key={index} />
    ))}
  </>
);

const Loading: FunctionComponent<LoadingProps> = (props) => {
  const { vertical, className, type, color, size, textSize, children } = props;
  const classnames = {
    container: clsx(className, 'van-loading', {
      'van-loading--vertical': vertical,
    }),
    spinner: clsx('van-loading__spinner', {
      'van-loading__spinner--spinner': type === 'spinner',
      'van-loading__spinner--circular': type === 'circular',
    }),
  };
  const stylesheets: Record<string, CSSProperties> = {
    spinner: pickStyle({
      color,
      width: size,
      height: size,
    }),
    text: pickStyle({
      fontSize: textSize,
    }),
  };
  const visibility = {
    dots: type === 'spinner',
  };

  return (
    <View className={classnames.container}>
      <View className={classnames.spinner} style={stylesheets.spinner}>
        <Select in={visibility.dots}>
          <Dots />
        </Select>
      </View>
      <View className="van-loading__text" style={stylesheets.text}>
        {children}
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousLoadingProps, NeutralLoadingProps>(
  DefaultLoadingProps
)(Loading);
