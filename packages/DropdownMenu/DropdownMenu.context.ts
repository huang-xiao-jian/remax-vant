// packages
import { createContext } from 'react';
// internal
import { DropdownMenuActions } from './DropdownMenu.redux';

export interface DropdownMenuContextPayload {
  // DropdownItem 属性透传
  activeColor: string;
  overlay: boolean;
  zIndex: number;
  direction: 'up' | 'down';
  duration: number;
  // DropdownMenu 内部逻辑
  id: string; // 限定查询范围
  activeCategory: string;
  dispatch: (action: DropdownMenuActions) => void;
}

export const DropdownMenuContext = createContext<DropdownMenuContextPayload>({
  activeColor: '#1989fa',
  overlay: true,
  zIndex: 10,
  direction: 'down',
  duration: 200,
  id: 'placeholder',
  activeCategory: 'placeholder',
  dispatch: () => {
    throw new Error('Default dispatch function should never have been called');
  },
});
