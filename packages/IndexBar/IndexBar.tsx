// packages
import React, { FunctionComponent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useNativeEffect } from 'remax';
import { View } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';
// internal
import IndexBarContext, { IndexBarContextPayload } from './IndexBarContext';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './IndexBar.css';

// 默认值填充属性
interface NeutralIndexBarProps {
  indexList: string[];
  zIndex: number;
  sticky: boolean;
  stickyOffsetTop: number;
  highlightColor: string;
}

interface ExogenousIndexBarProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 选择字符回调
  onSelect?: (event: { detail: string }) => void;
}

type IndexBarProps = NeutralIndexBarProps & ExogenousIndexBarProps;

const DefaultIndexBarProps: NeutralIndexBarProps = {
  indexList: 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(','),
  zIndex: 1,
  sticky: true,
  stickyOffsetTop: 0,
  highlightColor: '#07c160',
};

// TODO - support sticky anchor
// TODO - support sync index from page scroll to sidebar
const IndexBar: FunctionComponent<IndexBarProps> = (props) => {
  const {
    className,
    indexList,
    zIndex,
    highlightColor,
    children,
    onSelect,
  } = props;
  const classnames = {
    container: clsx(className, 'van-index-bar'),
  };

  // continuous track scrollTop, weired, but better way not found
  const scrollTop = useRef(0);

  usePageEvent('onPageScroll', (event: { scrollTop: number }) => {
    scrollTop.current = event.scrollTop;
  });

  const [activeAnchorIndex, setActiveAnchorIndex] = useState('');
  // context 穿透
  const payload: IndexBarContextPayload = {
    activeAnchorIndex,
    scrollTop: scrollTop.current,
  };
  // 事件冒泡
  const onSelectWrap = (event: any) => {
    const { index } = event.target.dataset;

    // 冒泡
    if (typeof onSelect === 'function') {
      onSelect({ detail: index });
    }

    // 滚动
    setActiveAnchorIndex(index);
  };

  // 计算滚动阶段 active anchor index
  const sidebar = useRef({
    height: 0,
    top: 0,
  });

  // TODO - support multiple sidebar within page, selector unique
  useNativeEffect(() => {
    wx.createSelectorQuery()
      .select('.van-index-bar__sidebar')
      .boundingClientRect()
      .exec(([rect]: [WechatMiniprogram.BoundingClientRectResult]) => {
        sidebar.current.height = rect.height;
        sidebar.current.top = rect.top;
      });
  }, [indexList]);

  const onTouchMove = ({ touches: [touch] }: any) => {
    const { length } = indexList;
    const space = sidebar.current.height / length;
    const theory = {
      index: Math.floor((touch.clientY - sidebar.current.top) / space),
    };

    if (theory.index < 0) {
      theory.index = 0;
    } else if (theory.index > length - 1) {
      theory.index = length - 1;
    }

    // convert serial number into actual index
    setActiveAnchorIndex(indexList[theory.index]);
  };

  return (
    <IndexBarContext.Provider value={payload}>
      <View className={classnames.container}>
        {children}
        <View
          className="van-index-bar__sidebar"
          onClick={onSelectWrap}
          onTouchMove={onTouchMove}
        >
          {indexList
            .map((index) => ({
              index,
              style: pickStyle({
                zIndex: zIndex + 1,
                color: activeAnchorIndex === index ? highlightColor : '',
              }),
            }))
            .map((item) => (
              <View
                className="van-index-bar__index"
                key={item.index}
                style={item.style}
                data-index={item.index}
              >
                {item.index}
              </View>
            ))}
        </View>
      </View>
    </IndexBarContext.Provider>
  );
};

export default withDefaultProps<ExogenousIndexBarProps, NeutralIndexBarProps>(
  DefaultIndexBarProps
)(IndexBar);
