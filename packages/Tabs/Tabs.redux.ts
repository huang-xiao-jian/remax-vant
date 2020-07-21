// packages
import { Reducer } from 'react';
// internal
import { TabUnit } from './Tabs.constant';

// 子组件上报信息
export interface TabState {
  // 提取 name 快速获取 index
  names: string[];
  // 子组件上报信息管理
  units: TabUnit[];
}

export enum TabActionTypes {
  SettleTab = 'SettleTab', // 注册 tab 条目
  SelectTab = 'SelectTab', // 选择 tab 条目
}

export interface SettleTabAction {
  type: TabActionTypes.SettleTab;
  payload: TabUnit;
}

export interface SelectTabAction {
  type: TabActionTypes.SelectTab;
  payload: {
    value: string;
  };
}

export type TabAction = SettleTabAction | SelectTabAction;

function handleSettleTab(state: TabState, action: SettleTabAction): TabState {
  const match = state.units.find((unit) => unit.id === action.payload.id);
  const units = match
    ? state.units.map((unit) =>
        unit.id === match.id ? { ...match, ...action.payload } : unit
      )
    : [...state.units, action.payload];
  const names = units.map((unit) => unit.name);

  return { ...state, units, names };
}

export function tabsReducer(state: TabState, action: TabAction): TabState {
  switch (action.type) {
    case TabActionTypes.SettleTab:
      return handleSettleTab(state, action);
    default:
      return state;
  }
}

export type TabsReducerType = Reducer<TabState, TabAction>;
