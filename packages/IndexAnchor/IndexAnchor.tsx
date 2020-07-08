// packages
import React, { FunctionComponent, useContext, useMemo } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
import { useNativeEffect } from 'remax';
// internal
import IndexBarContext from '../IndexBar/IndexBarContext';
import './IndexAnchor.css';

// 默认值填充属性
interface IndexAnchorProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 索引字符
  index: string | number;
}

// TODO - adapt stickyOffsetTop
const IndexAnchor: FunctionComponent<IndexAnchorProps> = (props) => {
  // index-bar relation
  const {
    activeAnchorIndex,
    scrollTop,
    wrapperStyle,
    anchorStyle,
  } = useContext(IndexBarContext);
  const { className, index } = props;
  const classnames = {
    container: clsx(className, 'van-index-anchor-wrapper'),
    anchor: clsx('van-index-anchor', {
      'van-index-anchor--active': activeAnchorIndex === index,
      'van-hairline--bottom': activeAnchorIndex === index,
    }),
  };

  // 新增属性，便于获取实际节点
  const id = useMemo(() => `van-index-anchor-wrapper-${index}`, [index]);

  // 匹配时自动滚动
  useNativeEffect(() => {
    if (activeAnchorIndex === index) {
      wx.createSelectorQuery()
        .select(`#${id}`)
        .boundingClientRect()
        .exec(([rect]: [BoundingClientRectResult]) => {
          wx.pageScrollTo({
            // duration: 0,
            scrollTop: scrollTop + rect.top,
          });
        });
    }
  }, [activeAnchorIndex]);

  return (
    <View id={id} style={wrapperStyle} className={classnames.container}>
      <View style={anchorStyle} className={classnames.anchor}>
        {index}
      </View>
    </View>
  );
};

export default IndexAnchor;
