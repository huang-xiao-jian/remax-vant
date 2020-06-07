// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
// eslint-disable-next-line import/named
import { GridProps } from '../Grid/Grid';
import pickStyle from '../tools/pick-style';
import './GridItem.css';

interface ExogenousGridItemProps {
  // ITEM 序号，Grid parent 显式传入，声明非必须仅为方便类型推导
  index?: number;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onClick?: (event: any) => void;
}

// vant-weapp 使用 relations 链接
type InheritGridProps = Partial<Omit<GridProps, 'className'>>;
type GridItemProps = ExogenousGridItemProps & InheritGridProps;

// wrap children with built-in classname van-grid-item__icon, van-grid-item__text
/*
  <view class="van-grid-item__icon">{icon}</view>
  <view class="van-grid-item__text">{text}</view>
 */

// TODO - hairline bottom border invisible
const GridItem: FunctionComponent<GridItemProps> = (props) => {
  const {
    className,
    square,
    center,
    clickable,
    direction,
    index,
    border,
    gutter,
    columnNum,
    children,
  } = props;
  const { onClick } = props;
  const classnames = {
    container: clsx(className, 'van-grid-item', {
      'van-grid-item--square': square,
    }),
    item: clsx(
      'van-grid-item__content',
      direction && `van-grid-item__content--${direction}`,
      {
        'van-grid-item__content--center': center,
        'van-grid-item__content--clickable': clickable,
        'van-grid-item__content--surround': border && gutter,
        'van-grid-item__content--square': square,
        'van-hairline--surround': border,
      }
    ),
  };
  const style: Record<'view' | 'content', CSSProperties> = {
    view: pickStyle({
      width: `${100 / (columnNum as number)}%`,
      paddingTop: square ? `${100 / (columnNum as number)}%` : undefined,
      paddingRight: gutter ?? undefined,
      marginTop:
        (index as number) >= (columnNum as number) ? gutter : undefined,
    }),
    content: pickStyle({
      height: 'auto',
      right: square ? gutter : undefined,
      bottom: square ? gutter : undefined,
    }),
  };

  return (
    <View style={style.view} className={classnames.container} onClick={onClick}>
      <View style={style.content} className={classnames.item}>
        {children}
      </View>
    </View>
  );
};

export default GridItem;
