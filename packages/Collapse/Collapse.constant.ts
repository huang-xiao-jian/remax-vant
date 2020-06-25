// packages
import { createContext } from 'react';

export interface CollapseContextPayload {
  // 上层状态管理
  value: string | string[];
  dispatch: (name: string) => void;
}

export const CollapseContext = createContext<CollapseContextPayload>({
  value: [],
  dispatch() {
    throw new Error('default CollapseContext should have never been called');
  },
});
