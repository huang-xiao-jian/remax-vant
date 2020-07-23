// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useContext,
  useCallback,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { range } from '../tools/range';
import { useTouchLite } from '../tools/use-touch-lite';
// PickerColumn 必须处于 PickerContext 之下
import { PickerContext } from '../Picker/Picker.context';
import { PickerColumnProps } from './PickerColumn.interface';
import './PickerColumn.css';

// CHANGES:
//   1. drop support for candidate disabled option;
const PickerColumn: FunctionComponent<PickerColumnProps> = (props) => {
  // destruct
  const { className, options, value, onChange } = props;
  const { visibleItemCount, itemHeight } = useContext(PickerContext);

  // 0, -1 ==> 0
  const currentIndex =
    options.findIndex((option) => option.value === value) || 0;
  // 初始状态向下偏移，用户体验考量，作为偏移基准
  const base = (itemHeight * (visibleItemCount - 1)) / 2;
  // 边界值保留 2 个选项
  const minimumOffset = -(options.length - 2) * itemHeight;
  const maximumOffset = (visibleItemCount - 2) * itemHeight;
  // 当前选项偏移
  const offset = -currentIndex * itemHeight;
  // 复用滑动 hook
  const { disc, onTouchStart, onTouchMove, onTouchEnd } = useTouchLite();

  // touch 滑动状态额外添加 deltaY
  const realTranslateY = disc.dragging
    ? offset + base + disc.deltaY
    : offset + base;
  const translateY = range(realTranslateY, minimumOffset, maximumOffset);
  const transitionDuration = disc.dragging ? 0 : 200;

  // UI bindings
  const classnames = {
    container: clsx(className, 'van-picker-column'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      height: `${visibleItemCount * itemHeight}px`,
    },
    wrap: {
      transition: `transform ${transitionDuration}ms`,
      transform: `translate3d(0, ${translateY}px, 0)`,
    },
    item: {
      height: `${itemHeight}px`,
      lineHeight: `${itemHeight}px`,
    },
  };

  const onTouchEndWrap = (event: TouchEventMini) => {
    // 原始调用
    onTouchEnd(event);

    // 计算偏移索引
    // const position = offset + base + ;
    const offsetIndex = Math.round(-disc.deltaY / itemHeight);
    const nextIndex = range(currentIndex + offsetIndex, 0, options.length - 1);

    // index 已确认不会越界，此处不进行额外判定
    onChange(options[nextIndex].value);
  };
  // 阻止冒泡，remax stopPropagation 未生效
  const noop = useCallback(() => {}, []);

  return (
    /* @ts-ignore */
    <View catchTouchMove={noop}>
      <View
        style={stylesheets.container}
        className={classnames.container}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndWrap}
      >
        <View style={stylesheets.wrap}>
          {options.map((option) => {
            const classNameOption = clsx(
              'van-ellipsis',
              'van-picker-column__item',
              {
                'van-picker-column__item--selected': value === option.value,
              }
            );

            const onClickCandidate = () => {
              onChange(option.value);
            };

            return (
              <View
                key={option.value}
                style={stylesheets.item}
                className={classNameOption}
                onClick={onClickCandidate}
              >
                {option.title}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PickerColumn;
