// packages
import { createContext } from 'react';
import { TabAction } from './Tabs.redux';

export interface TabsContextPayload {
  value: string;
  animated: boolean;
  dispatch: (action: TabAction) => void;
}

export const TabsContext = createContext<TabsContextPayload>({
  // 默认值无所谓
  value: '',
  animated: false,
  dispatch: () => {
    throw new Error(
      'TabsContext default dispatch should never have been called'
    );
  },
});
