// packages
import React, {
  FunctionComponent,
  useRef,
  useState,
  CSSProperties,
  useMemo,
  ReactElement,
  isValidElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
import { useNativeEffect } from 'remax';
// internal
import { Select } from '../tools/Switch';
import { range } from '../tools/range';
import withDefaultProps from '../tools/with-default-props-advance';
import './SwipeCell.css';
import uuid from '../tools/uuid';

// 默认值填充属性
interface NeutralSwipeCellProps {
  asyncClose: boolean;
  disabled: boolean;
}

interface ExogenousSwipeCellProps {
  // 标识符
  name: string;
  left?: ReactElement;
  right?: ReactElement;
  // 容器类名，用以覆盖内部
  className?: string;
  onClick?: (event: unknown) => void;
}

type SwipeCellProps = NeutralSwipeCellProps & ExogenousSwipeCellProps;

// scope
const DefaultSwipeCellProps: NeutralSwipeCellProps = {
  asyncClose: false,
  disabled: false,
};

const SwipeCell: FunctionComponent<SwipeCellProps> = (props) => {
  const threshold = 0.35;
  const { className, left, right, onClick, children } = props;
  const classnames = {
    container: clsx(className, 'van-swipe-cell'),
  };

  const visibility = {
    left: isValidElement(left),
    right: isValidElement(right),
  };

  const ids = useMemo(
    () => ({
      left: uuid(),
      right: uuid(),
    }),
    []
  );
  // 计算左右元素宽度
  const $width$ = useRef({
    left: 0,
    right: 0,
  });

  // run only once, declare left, right one time
  useNativeEffect(() => {
    const qs = wx.createSelectorQuery();

    qs.select(`#${ids.left}`).boundingClientRect();
    qs.select(`#${ids.right}`).boundingClientRect();

    qs.exec(
      (
        results: [
          BoundingClientRectResult | undefined,
          BoundingClientRectResult | undefined
        ]
      ) => {
        $width$.current.left = results[0]?.width || 0;
        $width$.current.right = results[1]?.width || 0;
      }
    );
  }, []);

  // 滑动逻辑处理
  const [offset, setOffset] = useState(0);
  // 滑动状态
  const $touch$ = useRef({
    status: 'SILENT',
    startX: 0,
    startOffset: 0,
  });

  const onTouchStart = (event: any) => {
    $touch$.current = {
      status: 'START',
      startX: event.touches[0].clientX,
      startOffset: offset,
    };
  };

  const onTouchMove = (event: any) => {
    // 状态标记，用以 transition 样式计算
    $touch$.current.status = 'DRAGING';

    // 滑动距离计算 value 变化
    const deltaX = event.touches[0].clientX - $touch$.current.startX;
    const next = $touch$.current.startOffset + deltaX;

    setOffset(range(next, -$width$.current.right, $width$.current.left));
  };

  const onTouchEnd = () => {
    // 状态标记，用以 transition 样式计算
    $touch$.current.status = 'SILENT';

    // 计算终值
    if (visibility.right && -offset > $width$.current.right * threshold) {
      setOffset(-$width$.current.right);
    } else if (visibility.left && offset > $width$.current.left * threshold) {
      setOffset($width$.current.left);
    } else {
      setOffset(0);
    }
  };

  const onClickWrap = (event: any) => {
    // 关闭 swipe 状态
    setOffset(0);

    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  const swipeStyle: CSSProperties = {
    transform: `translate3d(${offset}px, 0, 0)`,
    transition:
      $touch$.current.status === 'DRAGGING'
        ? 'none'
        : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)',
  };

  return (
    <View
      className={classnames.container}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={onClickWrap}
    >
      <View style={swipeStyle}>
        <Select in={visibility.left}>
          <View id={ids.left} className="van-swipe-cell__left">
            {left}
          </View>
        </Select>
        {children}
        <Select in={visibility.right}>
          <View id={ids.right} className="van-swipe-cell__right">
            {right}
          </View>
        </Select>
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousSwipeCellProps, NeutralSwipeCellProps>(
  DefaultSwipeCellProps
)(SwipeCell);
