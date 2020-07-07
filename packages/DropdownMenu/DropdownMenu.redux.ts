// packages
import { Reducer } from 'react';
// internal
import { DropdownMenuUnit } from './DropdownMenu.constant';

// 子组件上报信息
export enum DropdownActionTypes {
  SwitchCategory = 'SwitchCategory', // DropdownMenu 切换分类
  SilentCategory = 'SilentCategory', // DropdownMenu 关闭分类
  SettleCategory = 'SettleCategory', // DropdownItem 注册分类
  ExileCategory = 'ExileCategory', // DropdownItem 删除分类
}

export interface SettleCategoryAction {
  type: DropdownActionTypes.SettleCategory;
  payload: {
    // 选项菜单名
    category: string;
    // 显示文本，未选择状态显示 category
    text?: string;
    // 禁用选项
    disabled?: boolean;
  };
}

export interface SwitchCategoryAction {
  type: DropdownActionTypes.SwitchCategory;
  payload: {
    category: string;
  };
}

export interface ExileCategoryAction {
  type: DropdownActionTypes.ExileCategory;
  payload: {
    category: string;
  };
}

export interface SilentCategoryAction {
  type: DropdownActionTypes.SilentCategory;
}

export type DropdownMenuActions =
  | SwitchCategoryAction
  | SilentCategoryAction
  | SettleCategoryAction
  | ExileCategoryAction;

export interface DropdownMenuState {
  activeCategory: string;
  units: DropdownMenuUnit[];
}

// SettleCategoryAction
function handleSettleCategory(
  state: DropdownMenuState,
  action: SettleCategoryAction
): DropdownMenuState {
  // 前置 units
  const { units: _units } = state;
  const { payload } = action;

  const matcher = _units.find((unit) => unit.category === payload.category);
  // 派生 units，未有匹配为新增、匹配为修改
  const units = !matcher
    ? [..._units, payload]
    : _units.map((unit) =>
        unit.category === payload.category ? { ...unit, ...payload } : unit
      );

  return { ...state, units };
}

// ExileCategoryAction
function handleExileCategory(
  state: DropdownMenuState,
  action: ExileCategoryAction
): DropdownMenuState {
  // 前置 units
  const { units: _units } = state;
  const {
    payload: { category },
  } = action;

  const units = _units.filter((unit) => unit.category !== category);

  return { ...state, units };
}

// SwitchCategoryAction
function handleSwitchCategory(
  state: DropdownMenuState,
  action: SwitchCategoryAction
): DropdownMenuState {
  // 前序状态结构
  const { activeCategory: _activeCategory } = state;
  const {
    payload: { category },
  } = action;
  // 开关操作
  const activeCategory = category === _activeCategory ? '' : category;

  return { ...state, activeCategory };
}

export function dropdownMenuReducer(
  state: DropdownMenuState,
  action: DropdownMenuActions
): DropdownMenuState {
  switch (action.type) {
    case DropdownActionTypes.SettleCategory:
      return handleSettleCategory(state, action);
    case DropdownActionTypes.ExileCategory:
      return handleExileCategory(state, action);
    // case DropdownActionTypes.SilentCategory:
    //   return { ...state, activeCategory: '' };
    case DropdownActionTypes.SwitchCategory:
      return handleSwitchCategory(state, action);
    default:
      return state;
  }
}

export type DropdownMenuReducer = Reducer<
  DropdownMenuState,
  DropdownMenuActions
>;
