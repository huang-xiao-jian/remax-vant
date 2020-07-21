// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import uuid from '../tools/uuid';
import './Sticky.css';

// 默认值填充属性
interface NeutralStickyProps {
  offsetTop: number;
  zIndex: number;
  disabled: boolean;
}

interface ExogenousStickyProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 支持特定容器
  containerId?: string;
}

type StickyProps = NeutralStickyProps & ExogenousStickyProps;

const DefaultStickyProps: NeutralStickyProps = {
  offsetTop: 0,
  zIndex: 99,
  disabled: false,
};

interface StickyState {
  fixed: boolean;
  height: number;
  transform: number;
}

// CHANGE:
//   1. give up container support just now
//   2. drop scrollTop property pass, which means Sticky component almost done nothing
const Sticky: FunctionComponent<StickyProps> = (props) => {
  const {
    className,
    containerId,
    disabled,
    offsetTop,
    zIndex,
    children,
  } = props;
  const id = useMemo(() => uuid(), []);
  const [state, setState] = useState<StickyState>({
    height: 0,
    transform: 0,
    fixed: false,
  });
  const classnames = {
    container: clsx(className, 'van-sticky'),
    wrap: clsx('van-sticky-wrap', {
      'van-sticky-wrap--fixed': state.fixed,
    }),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: pickStyle({
      zIndex,
      height: state.fixed ? `${state.height}px` : undefined,
    }),
    wrap: pickStyle({
      zIndex,
      top: state.fixed ? `${offsetTop}px` : undefined,
      transform: state.transform
        ? `translate3d(0, ${state.transform}px ,0)`
        : undefined,
    }),
  };

  const handleDisableSituation = () => {
    // 重置所有状态
    setState(() => ({
      fixed: false,
      height: 0,
      transform: 0,
    }));
  };
  // container 未指定状态
  const handleStandaloneSituation = () => {
    wx.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(([rect]: [BoundingClientRectResult]) => {
        if (rect.top < offsetTop) {
          setState((acc) => ({
            ...acc,
            fixed: true,
            height: rect.height,
          }));
        } else {
          setState((acc) => ({ ...acc, fixed: false }));
        }
      });
  };

  // container 指定状态
  const handleComplexSituation = () => {
    const query = wx.createSelectorQuery();

    // sticky rect
    query.select(`#${id}`).boundingClientRect();
    // container rect, be careful with id property
    query.select(`#${containerId}`).boundingClientRect();

    query.exec(
      ([element, container]: [
        BoundingClientRectResult,
        BoundingClientRectResult
      ]) => {
        // can't understand condition meaning now
        if (offsetTop + element.height > container.height + container.top) {
          setState((acc) => ({
            ...acc,
            fixed: false,
            transform: container.height - element.height,
          }));
        } else if (offsetTop >= element.top) {
          setState((acc) => ({
            ...acc,
            fixed: true,
            height: element.height,
            transform: 0,
          }));
        } else {
          setState((acc) => ({ ...acc, fixed: false, transform: 0 }));
        }
      }
    );
  };

  // ref 桥接，避免非必要 effect 调用
  const onPageScrollRef = useRef<() => void>();
  // 强迫症留点注释吧
  onPageScrollRef.current = () => {
    switch (true) {
      case disabled:
        handleDisableSituation();
        break;
      case typeof containerId === 'string':
        handleComplexSituation();
        break;
      default:
        handleStandaloneSituation();
    }
  };

  // use remax-macro event biding
  usePageEvent('onPageScroll', onPageScrollRef.current);

  // re-exectute scroll calculation after offsetTop, disabled property change
  useEffect(() => {
    if (typeof onPageScrollRef.current === 'function') {
      onPageScrollRef.current();
    }
  }, [offsetTop, disabled, onPageScrollRef]);

  return (
    <View
      id={id}
      style={stylesheets.container}
      className={classnames.container}
    >
      <View style={stylesheets.wrap} className={classnames.wrap}>
        {children}
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousStickyProps, NeutralStickyProps>(
  DefaultStickyProps
)(Sticky);
