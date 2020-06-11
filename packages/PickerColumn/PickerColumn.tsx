// packages
import React, { FunctionComponent, CSSProperties, useReducer } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import {
  reducer,
  PickerColumnReducer,
  PickerColumnStage,
  PickerColumnActionTypes,
  range,
} from './redux';
import './PickerColumn.css';

export interface CandidatePlayer {
  // 唯一标识，用于 list item key，默认使用 name
  key?: string;
  // view 渲染
  name: string;
  // 禁用当选项，理论上应该在传入 CandidatePlayer 之前预处理
  // disabled?: boolean;
}

interface ExogenousPickerColumnProps {
  // 容器类名，用以覆盖内部
  className?: string;
  itemHeight: number;
  visibleItemCount: number;
  // 候选项
  candidates: CandidatePlayer[];
  activeIndex: number;
  onChange: (index: number) => void;
}

type PickerColumnProps = ExogenousPickerColumnProps;

// CHANGES:
//   1. drop support for candidate disabled option;
const PickerColumn: FunctionComponent<PickerColumnProps> = (props) => {
  // destruct
  const {
    activeIndex,
    className,
    visibleItemCount,
    itemHeight,
    candidates,
    onChange,
  } = props;

  // 内部状态管理
  const [state, dispatch] = useReducer<PickerColumnReducer>(reducer, {
    stage: PickerColumnStage.SILENT,
    duration: 200,
  });

  // derivation
  // 初始状态向下偏移，用户体验考量
  const base = (itemHeight * (visibleItemCount - 1)) / 2;
  const offset = -activeIndex * itemHeight;
  const translateY =
    state.stage === PickerColumnStage.SILENT
      ? offset + base
      : (state.offset as number) + base;

  // UI bindings
  const classnames = {
    container: clsx(className, 'van-picker-column'),
    item: (index: number) =>
      clsx('van-ellipsis', 'van-picker-column__item', {
        'van-picker-column__item--selected': index === activeIndex,
      }),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      height: `${visibleItemCount * itemHeight}px`,
    },
    wrap: {
      transition: `transform ${state.duration}ms`,
      transform: `translate3d(0, ${translateY}px, 0)`,
    },
    item: {
      height: `${itemHeight}px`,
      lineHeight: `${itemHeight}px`,
    },
  };

  // 初始状态重置
  const onTouchStart = (event: any) => {
    dispatch({
      type: PickerColumnActionTypes.TOUCH_START,
      payload: {
        startY: event.touches[0].clientY,
        startOffset: offset,
      },
    });
  };

  const onTouchMove = (event: any) => {
    dispatch({
      type: PickerColumnActionTypes.TOUCH_MOVE,
      payload: { clientY: event.touches[0].clientY },
      extra: {
        itemHeight,
        count: candidates.length,
      },
    });
  };

  const onTouchEnd = () => {
    dispatch({
      type: PickerColumnActionTypes.TOUCH_END,
    });

    const nextIndex = range(
      Math.round(Math.abs(state.offset as number) / itemHeight),
      0,
      candidates.length - 1
    );

    onChange(nextIndex);
  };

  // 沿用原版委托模式
  const onClickCandidate = (event: any) => {
    const currentIndex = event.target.dataset.index;

    // only trigger event when index mismatch
    if (currentIndex !== activeIndex) {
      onChange(currentIndex);
    }
  };

  return (
    <View
      style={stylesheets.container}
      className={classnames.container}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <View style={stylesheets.wrap}>
        {candidates.map((candidate, index) => (
          <View
            data-index={index}
            key={candidate.key || candidate.name}
            style={stylesheets.item}
            className={classnames.item(index)}
            onClick={onClickCandidate}
          >
            {candidate.name}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PickerColumn;
