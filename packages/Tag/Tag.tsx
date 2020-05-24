// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Tag.css';
import withDefaultProps from '../tools/with-default-props';

interface TagProps {
  type: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  plain: boolean;
  round: boolean;
  mask: boolean;
  closeable: boolean;
  size?: 'large' | 'medium';
  // 容器类名，用以覆盖内部
  className?: string;
}

const DefaultTagProps: TagProps = {
  type: 'default',
  plain: false,
  round: false,
  mask: false,
  closeable: false,
};

// @todo - support closeable property
const Tag: FunctionComponent<TagProps> = (props) => {
  const { className, type, plain, size, mask, round, children } = props;
  const classnames = {
    container: clsx(
      className,
      'van-tag',
      `van-tag--${type}`,
      `van-tag--${size}`,
      {
        'van-tag--mask': mask,
        'van-tag--round': round,
        'van-tag--plain': plain,
        'van-hairline--surround': plain,
      }
    ),
  };

  return <View className={classnames.container}>{children}</View>;
};

export default withDefaultProps(DefaultTagProps)(Tag);
