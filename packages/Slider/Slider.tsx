// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useCallback,
  useRef,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { Switch, Case } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Slider.css';

// @todo - expose unify custom event
interface SliderEvent {
  detail: number;
}

// 相对于调用者可选属性，底层可能为必须属性，一般为高阶组件传入
// 默认值填充属性
interface NeutralSliderProps {
  // 移植属性
  disabled: boolean;
  min: number;
  max: number;
  step: number;
  activeColor: string;
  inactiveColor: string;
  barHeight: string;
}
// 不包含默认值属性
interface ExogenousSliderProps {
  // 受控组件
  value: number;
  // 改造新增属性
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onChange?: (event: SliderEvent) => void;
}

interface DragState {
  status: 'SILENT' | 'START' | 'DRAGING';
  startX?: number;
  startValue?: number;
}

type SliderProps = NeutralSliderProps & ExogenousSliderProps;

const DefaultSliderProps: NeutralSliderProps = {
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  activeColor: '#1989fa',
  inactiveColor: '#e5e5e5',
  barHeight: '2px',
};

// calculate nearest point based on step
const format = (max: number, min: number, step: number, value: number) =>
  Math.round(Math.max(min, Math.min(value, max)) / step) * step;

// CHANGES:
// 1. remove transition: none change;
// TODO - better strategy to deal with `disabled` behavior
const Slider: FunctionComponent<SliderProps> = (props) => {
  const {
    className,
    activeColor,
    inactiveColor,
    min,
    max,
    step,
    value: _value1,
    barHeight,
    disabled,
    children,
    onChange,
  } = props;

  /* render setup */
  const ref = useRef<DragState>({
    status: 'SILENT',
  });
  const value = format(max, min, step, _value1);

  /* ui property binding */
  const classnames = {
    container: clsx(className, 'van-slider', {
      'van-slider--disabled': disabled,
    }),
  };
  const stylesheets: Record<'container' | 'bar', CSSProperties> = {
    // for outer view container
    container: pickStyle({
      backgroundColor: inactiveColor,
    }),
    // for inner bar
    bar: pickStyle({
      width: `${((value - min) * 100) / (max - min)}%`,
      height: barHeight,
      backgroundColor: activeColor,
    }),
  };
  /* function block */
  const onContainerClick = useCallback(
    (event) => {
      wx.createSelectorQuery()
        .select('#van-slider')
        .boundingClientRect()
        .exec(([bounding]: [WechatMiniprogram.BoundingClientRectResult]) => {
          const raw =
            ((event.detail.x - bounding.left) / bounding.width) * (max - min) +
            min;
          const next = format(max, min, step, raw);

          // bubble up
          if (typeof onChange === 'function') {
            onChange({ detail: next });
          }
        });
    },
    [max, min, step, onChange]
  );

  const onTouchStart = (event: any) => {
    // 初始滑动标记
    ref.current = {
      status: 'START',
      startX: event.touches[0].clientX,
      startValue: value,
    };
  };

  const onTouchMove = (event: any) => {
    wx.createSelectorQuery()
      .select('#van-slider')
      .boundingClientRect()
      .exec(([bounding]: [WechatMiniprogram.BoundingClientRectResult]) => {
        // 状态标记，用以 transition 样式计算
        ref.current.status = 'DRAGING';

        console.group('slider');
        console.log(ref.current);
        // 滑动距离计算 value 变化
        const diff =
          ((event.touches[0].clientX - (ref.current.startX as number)) /
            bounding.width) *
          (max - min);
        const raw = (ref.current.startValue as number) + diff;
        const next = format(max, min, step, raw);

        console.log(diff);
        console.log(raw);
        console.groupEnd();

        // bubble up
        if (typeof onChange === 'function') {
          onChange({ detail: next });
        }
      });
  };

  // TouchEnd, TouchCancel 合体
  const onTouchCancel = useCallback(() => {
    // 滑动结束标记
    ref.current.status = 'SILENT';
  }, []);

  return (
    <View
      id="van-slider"
      style={stylesheets.container}
      className={classnames.container}
      onClick={onContainerClick}
    >
      <View className="van-slider__bar" style={stylesheets.bar}>
        <View
          className="van-slider__button-wrapper"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchCancel}
          onTouchCancel={onTouchCancel}
        >
          <Switch>
            <Case in={!!children}>{children}</Case>
            <Case default>
              <View className="van-slider__button" />
            </Case>
          </Switch>
        </View>
      </View>
    </View>
  );
};

export default withDefaultProps<ExogenousSliderProps, NeutralSliderProps>(
  DefaultSliderProps
)(Slider);
