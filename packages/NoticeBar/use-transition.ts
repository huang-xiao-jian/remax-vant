/* eslint-disable import/prefer-default-export */
/**
 * @description - manage transition style more graceful
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

import { useReducer, CSSProperties, Reducer, Dispatch, useRef } from 'react';

export enum NoticeBarActionTypes {
  Preset = 'Preset', // 设置相关参数
  Pristine = 'Pristine', // 恢复初始状态
  Drift = 'Drift', // 记录变量，单词动作序列内保持不变
  DriftActive = 'DriftActive', // 初始滚动
  Iteration = 'Iteration', // 后续循环滚动触发，不涉及数据变更，类似于 Epic
  IterationStandby = 'IterationStandby', // 滚动预备
  IterationActive = 'IterationActive', // 滚动激活
}

interface DriftOptions {
  duration: number;
  delay: number;
  contentWidth: number;
  warpWidth: number;
  timeout?: NodeJS.Timeout;
}

interface PresetAction {
  type: NoticeBarActionTypes.Preset;
  payload: DriftOptions;
}

interface PristineAction {
  type: NoticeBarActionTypes.Pristine;
}

interface DriftAction {
  type: NoticeBarActionTypes.Drift;
}

interface DriftActiveAction {
  type: NoticeBarActionTypes.DriftActive;
  payload: {
    duration: number;
    delay: number;
    contentWidth: number;
  };
}
interface IterationAction {
  type: NoticeBarActionTypes.Iteration;
}

interface IterationStandbyAction {
  type: NoticeBarActionTypes.IterationStandby;
  payload: {
    wrapWidth: number;
  };
}

interface IterationActiveAction {
  type: NoticeBarActionTypes.IterationActive;
  payload: {
    duration: number;
    contentWidth: number;
  };
}

// 符合 action 处理
type NoticeBarAction =
  | PristineAction
  | PresetAction
  | DriftAction
  | DriftActiveAction
  | IterationAction
  | IterationStandbyAction
  | IterationActiveAction;

function reducer(style: CSSProperties, action: NoticeBarAction) {
  switch (action.type) {
    // 直接跳转初始 UI 状态
    case NoticeBarActionTypes.Pristine:
      return {
        transition: 'none',
        transform: 'none',
      };
    // 初始滚动
    case NoticeBarActionTypes.DriftActive:
      return {
        transition: `transform ${action.payload.duration}ms linear ${action.payload.delay}ms`,
        transform: `translateX(${-1 * action.payload.contentWidth}px)`,
      };
    // 无限滚动预备
    case NoticeBarActionTypes.IterationStandby:
      return {
        transition: 'none',
        transform: `translateX(${action.payload.wrapWidth}px)`,
      };
    // 无限滚动启动
    case NoticeBarActionTypes.IterationActive:
      return {
        transition: `transform ${action.payload.duration}ms linear 0ms`,
        transform: `translateX(${-1 * action.payload.contentWidth}px)`,
      };
    default:
      return style;
  }
}

// delay 仅为初次转场使用
export function useTransition(): [CSSProperties, Dispatch<NoticeBarAction>] {
  const ref = useRef<DriftOptions>({
    duration: 0,
    delay: 0,
    warpWidth: 0,
    contentWidth: 0,
  });
  const [style, _dispatch] = useReducer<
    Reducer<CSSProperties, NoticeBarAction>
  >(reducer, {});
  const dispatch: Dispatch<NoticeBarAction> = (action) => {
    switch (action.type) {
      case NoticeBarActionTypes.Preset:
        // 设定过渡效果参数
        ref.current = action.payload;
        break;
      case NoticeBarActionTypes.Drift:
        // 参数内部读取，避免暴露外部逻辑
        _dispatch({
          type: NoticeBarActionTypes.DriftActive,
          payload: {
            duration: ref.current.duration,
            delay: ref.current.delay,
            contentWidth: ref.current.contentWidth,
          },
        });
        break;
      case NoticeBarActionTypes.Iteration:
        _dispatch({
          type: NoticeBarActionTypes.IterationStandby,
          payload: {
            wrapWidth: ref.current.warpWidth,
          },
        });

        ref.current.timeout = setTimeout(() => {
          _dispatch({
            type: NoticeBarActionTypes.IterationActive,
            payload: {
              duration: ref.current.duration,
              contentWidth: ref.current.contentWidth,
            },
          });
        }, 1000 / 30);
        break;
      case NoticeBarActionTypes.Pristine:
        if (ref.current.timeout) {
          clearTimeout(ref.current.timeout);
        }

        _dispatch(action);
        break;
      default:
        _dispatch(action);
    }
  };

  return [style, dispatch];
}
