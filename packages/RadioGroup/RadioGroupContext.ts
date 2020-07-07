// packages
import { createContext } from 'react';

// interface
interface RadioGroupContextAbstract {
  disabled: boolean;
  value?: string;
  onChange?: (name: string) => void;
}

// 默认值需要保持一致，以防万一
export default createContext<RadioGroupContextAbstract>({
  disabled: false,
});
