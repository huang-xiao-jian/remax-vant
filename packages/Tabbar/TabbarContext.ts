// packages
import { createContext } from 'react';

interface TabbarContextPayload {
  activeColor: string;
  inactiveColor: string;
}

const TabbarContext = createContext<TabbarContextPayload>({
  activeColor: '#1989fa',
  inactiveColor: '#7d7e80',
});

export default TabbarContext;
