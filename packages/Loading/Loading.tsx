// packages
import React, { FunctionComponent, Fragment } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Loading.css';
import withDefaultProps from '../tools/with-default-props';

interface LoadingProps {
  vertical: boolean;
  type: 'spinner' | 'circular';
  // 容器类名，用以覆盖内部
  className?: string;
  // loading 提示信息
  message?: string;
}

const DefaultLoadingProps: LoadingProps = {
  vertical: false,
  type: 'circular',
};

const Dots: FunctionComponent = () => (
  <Fragment>
    {Array.from({ length: 12 }).map((_, index) => (
      <View className="van-loading__dot" key={index} />
    ))}
  </Fragment>
);

const Loading: FunctionComponent<LoadingProps> = (props) => {
  const { vertical, className, type, message } = props;
  const classnames = {
    container: clsx('van-loading', className, {
      'van-loading--vertical': vertical,
    }),
    spinner: clsx('van-loading__spinner', {
      'van-loading__spinner--spinner': type === 'spinner',
      'van-loading__spinner--circular': type === 'circular',
    }),
  };

  return (
    <View className={classnames.container}>
      <View className={classnames.spinner}>
        {type === 'spinner' && <Dots />}
      </View>
      {message && <View className="van-loading__text">{message}</View>}
    </View>
  );
};

export default withDefaultProps(DefaultLoadingProps)(Loading);
