/* eslint-disable import/prefer-default-export */
// packages
import { CSSProperties, Reducer } from 'react';
import clsx from 'clsx';
// internal
import './Transition.css';

export enum TransitionActionType {
  // 初次渲染完成
  Appeared = 'Appeared',
  Enter = 'Enter',
  Entering = 'Entering',
  Entered = 'Entered',
  Leave = 'Leave',
  Leaving = 'Leaving',
  Left = 'Left',
  // name property 变化后，抖个机灵，直接用 Mutation
  Mutation = 'Mutation',
}

export interface TransitionState {
  // 初次渲染标记
  appeared: boolean;
  // 转场 CSS 名称
  name: string;
  // 转场时间
  duration: number | string;
  // 自定义样式覆盖
  className?: string;
  // 自定义样式覆盖
  style?: CSSProperties;
}

export interface TransitionAction {
  type: TransitionActionType;
  payload?: Partial<TransitionState>;
}

const stringifyDuration = (duration: number | string) =>
  typeof duration === 'number' ? `${duration}ms` : duration;

export const transitionReducer: Reducer<TransitionState, TransitionAction> = (
  state,
  action
) => {
  switch (action.type) {
    // 仅为处理首次渲染转场
    case TransitionActionType.Appeared:
      return { ...state, appeared: true };
    case TransitionActionType.Mutation:
      return action.payload ? { ...state, ...action.payload } : state;
    case TransitionActionType.Enter:
      return {
        ...state,
        className: clsx(`${state.name}-enter`),
        style: { ...state.style, display: 'block' },
      };
    case TransitionActionType.Entering:
      return {
        ...state,
        className: clsx(`${state.name}-enter`, `${state.name}-enter-active`),
        style: {
          display: 'block',
          transitionDuration: stringifyDuration(state.duration),
        },
      };
    case TransitionActionType.Entered:
      return {
        ...state,
        className: clsx(`${state.name}-enter-done`),
      };
    case TransitionActionType.Leave:
      return {
        ...state,
        className: clsx(`${state.name}-leave`),
      };
    case TransitionActionType.Leaving:
      return {
        ...state,
        className: clsx(`${state.name}-leave`, `${state.name}-leave-active`),
        style: {
          ...state.style,
          transitionDuration: stringifyDuration(state.duration),
        },
      };
    case TransitionActionType.Left:
      return {
        ...state,
        style: { display: 'none' },
        className: clsx(`${state.name}-leave-done`),
      };
    default:
      return state;
  }
};
