// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useCallback,
  useState,
  ComponentType,
  useRef,
} from 'react';
import clsx from 'clsx';
import { usePageInstance } from 'remax';
import { View } from 'remax/wechat';
// internal
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
  // 非受控组件初始值
  initialValue?: number;
  // 事件绑定
  onChange: (event: SliderEvent) => void;
  // 改造新增属性
  // 容器类名，用以覆盖内部
  className?: string;
}

interface DragState {
  status: 'SILENT' | 'START' | 'DRAGING';
  startX?: number;
  startValue?: number;
}

// HOC
type SliderProps = NeutralSliderProps & ExogenousSliderProps;
type TransparentDefaultProps = ExogenousSliderProps &
  Partial<NeutralSliderProps>;
type NeutralListenerKeys = 'value' | 'onChange';
type TransparentNeutralListenerProps = Omit<
  TransparentDefaultProps,
  NeutralListenerKeys
> &
  Partial<Pick<TransparentDefaultProps, NeutralListenerKeys>>;

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

// TODO - support custom inside button
// TODO - better strategy to deal with `disabled` behavior
const Slider: FunctionComponent<SliderProps> = (props) => {
  const {
    className,
    activeColor,
    inactiveColor,
    min,
    max,
    step,
    value: originValue,
    barHeight,
    disabled,
    onChange,
  } = props;

  /* render setup */
  const ref = useRef<DragState>({
    status: 'SILENT',
  });
  const page = usePageInstance();
  const value = format(max, min, step, originValue);

  /* ui property binding */
  const classnames = {
    container: clsx(className, 'van-slider', {
      'van-slider--disabled': disabled,
    }),
  };
  const styles: Record<'container' | 'bar', CSSProperties> = {
    // for outer view container
    container: inactiveColor
      ? {
          backgroundColor: inactiveColor,
        }
      : {},
    // for inner bar
    bar: {
      width: `${((value - min) * 100) / (max - min)}%`,
      height: barHeight,
      backgroundColor: activeColor,
    },
  };
  /* function block */
  const handleContainerClick = useCallback(
    (event: WechatMiniprogram.TapEvent) => {
      page
        .createSelectorQuery()
        .select('.van-slider')
        .boundingClientRect()
        .exec(([bounding]: [WechatMiniprogram.BoundingClientRectResult]) => {
          const raw =
            ((event.detail.x - bounding.left) / bounding.width) * (max - min) +
            min;
          const next = format(max, min, step, raw);

          // bubble up
          onChange({ detail: next });
        });
    },
    [max, min]
  );

  const handleTouchStart = (event: WechatMiniprogram.TapEvent) => {
    // 初始滑动标记
    ref.current = {
      status: 'START',
      startX: event.touches[0].clientX,
      startValue: value,
    };
  };

  const handleTouchMove = useCallback((event: WechatMiniprogram.TapEvent) => {
    page
      .createSelectorQuery()
      .select('.van-slider')
      .boundingClientRect()
      .exec(([bounding]: [WechatMiniprogram.BoundingClientRectResult]) => {
        // 状态标记，用以 transition 样式计算
        ref.current.status = 'DRAGING';
        const diff =
          ((event.touches[0].clientX - ref.current.startX) / bounding.width) *
          (max - min);
        const raw = ref.current.startValue + diff;
        const next = format(max, min, step, raw);

        // bubble up
        onChange({ detail: next });
      });
  }, []);

  // TouchEnd, TouchCancel 合体
  const handleTouchEndCancel = useCallback(() => {
    // 滑动结束标记
    ref.current.status = 'SILENT';
  }, []);

  return (
    <View
      style={styles.container}
      className={classnames.container}
      // @ts-ignore
      onClick={handleContainerClick}
    >
      <View className="van-slider__bar" style={styles.bar}>
        <View
          className="van-slider__button-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEndCancel}
          onTouchCancel={handleTouchEndCancel}
        >
          <View className="van-slider__button" />
        </View>
      </View>
    </View>
  );
};

// TODO - support controlled component
// withDefaultProps 最底层
const withDefaultListener = (
  Component: ComponentType<TransparentDefaultProps>
) => (props: TransparentNeutralListenerProps) => {
  const [value, setValue] = useState(props.initialValue || 0);
  const handleChangeEvent = useCallback((event: SliderEvent) => {
    setValue(event.detail);
  }, []);

  return <Component {...props} value={value} onChange={handleChangeEvent} />;
};

export default withDefaultListener(
  withDefaultProps<ExogenousSliderProps, NeutralSliderProps>(
    DefaultSliderProps
  )(Slider)
);
