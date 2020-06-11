/**
 * @description - redux style manage PickerColumn internal state
 */

// packages
import { Reducer } from 'react';

export enum PickerColumnActionTypes {
  // 滚动管理机制
  TOUCH_START = 'TOUCH_START',
  TOUCH_MOVE = 'TOUCH_MOVE',
  TOUCH_END = 'TOUCH_END',
}

export enum PickerColumnStage {
  SILENT = 'SILENT',
  DRAG_START = 'DRAG_START',
  DRAGGING = 'DRAGGING',
}

// 可选值在 TOUCH_START_ACTION 时初始化
export interface PickerColumnState {
  // 滚动过程使用内部状态管理
  stage: PickerColumnStage;
  // 起始纵坐标
  startY?: number;
  // 偏移量
  offset?: number;
  // 滑动起始偏移量
  startOffset?: number;
  // transition duration, scroll 时禁用过渡效果
  duration: number;
}

interface TouchStartAction {
  type: PickerColumnActionTypes.TOUCH_START;
  payload: {
    startY: number;
    startOffset: number;
  };
}

interface TouchMoveAction {
  type: PickerColumnActionTypes.TOUCH_MOVE;
  payload: {
    clientY: number;
  };
  // 作为参数传递，与载荷区分
  extra: {
    count: number;
    itemHeight: number;
  };
}

interface TouchEndAction {
  type: PickerColumnActionTypes.TOUCH_END;
}

export type PickerColumnAction =
  | TouchStartAction
  | TouchMoveAction
  | TouchEndAction;

export type PickerColumnReducer = Reducer<
  PickerColumnState,
  PickerColumnAction
>;

export const range: (num: number, min: number, max: number) => number = (
  num,
  min,
  max
) => Math.min(Math.max(num, min), max);

// 计算滚动状态偏移量
const handleTouchMoveAction = (
  state: PickerColumnState,
  action: TouchMoveAction
) => {
  const { startOffset, startY } = state;
  const {
    payload: { clientY },
    extra: { count, itemHeight },
  } = action;
  const deltaY = clientY - (startY as number);

  // startOffset must be number, otherwise, means code logical exception
  return range(
    (startOffset as number) + deltaY,
    -(count * itemHeight),
    itemHeight
  );
};

// eslint-disable-next-line import/prefer-default-export
export function reducer(
  state: PickerColumnState,
  action: PickerColumnAction
): PickerColumnState {
  switch (action.type) {
    // 记录起始状态
    case PickerColumnActionTypes.TOUCH_START:
      return {
        ...state,
        duration: 0,
        offset: action.payload.startOffset,
        stage: PickerColumnStage.DRAG_START,
        startY: action.payload.startY,
        startOffset: action.payload.startOffset,
      };
    // 内部状态管理
    case PickerColumnActionTypes.TOUCH_MOVE:
      return {
        ...state,
        stage: PickerColumnStage.DRAGGING,
        offset: handleTouchMoveAction(state, action),
      };
    // 终止状态管理，交还主动权
    case PickerColumnActionTypes.TOUCH_END:
      return { ...state, duration: 200, stage: PickerColumnStage.SILENT };
    default:
      throw new Error('non-supported action triggered, review weired code');
  }
}
