// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { Switch, Case, Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './Skeleton.css';

// 默认值填充属性
interface NeutralSkeletonProps {
  row: number;
  rowWidth: string | string[];
  title: boolean;
  titleWidth: string;
  avatar: boolean;
  avatarSize: string;
  avatarShape: 'round' | 'square';
  loading: boolean;
  animate: boolean;
}

interface ExogenousSkeletonProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

type SkeletonProps = NeutralSkeletonProps & ExogenousSkeletonProps;

const DefaultSkeletonProps: NeutralSkeletonProps = {
  row: 0,
  rowWidth: '100%',
  title: false,
  titleWidth: '40%',
  avatar: false,
  avatarSize: '32px',
  avatarShape: 'round',
  loading: true,
  animate: true,
};

const Skeleton: FunctionComponent<SkeletonProps> = (props) => {
  const {
    className,
    loading,
    animate,
    avatar,
    avatarSize,
    avatarShape,
    title,
    titleWidth,
    row,
    rowWidth,
    children,
  } = props;
  const classnames = {
    container: clsx(className, 'van-skeleton', {
      'van-skeleton--animate': animate,
    }),
    avatar: clsx(
      'van-skeleton__avatar',
      `van-skeleton__avatar--${avatarShape}`
    ),
  };
  const stylesheets: Record<string, CSSProperties> = {
    avatar: {
      width: avatarSize,
      height: avatarSize,
    },
    title: {
      width: titleWidth,
    },
  };

  // 占位符计算
  const elements = Array.from({ length: row }).map((_, index) => ({
    className: 'van-skeleton__row',
    style: {
      width: Array.isArray(rowWidth) ? rowWidth[index] : rowWidth,
    },
  }));

  return (
    <Switch>
      <Case in={loading}>
        <View className={classnames.container}>
          <Select in={avatar}>
            <View style={stylesheets.avatar} className={classnames.avatar} />
          </Select>

          <View className="van-skeleton__content">
            <Select in={title}>
              <View className="van-skeleton__title" style={stylesheets.title} />
            </Select>
            {elements.map((element, index) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={element.style}
                className={element.className}
              />
            ))}
          </View>
        </View>
      </Case>
      <Case default>
        <View className="van-skeleton__content">{children}</View>
      </Case>
    </Switch>
  );
};

export default withDefaultProps<ExogenousSkeletonProps, NeutralSkeletonProps>(
  DefaultSkeletonProps
)(Skeleton);
