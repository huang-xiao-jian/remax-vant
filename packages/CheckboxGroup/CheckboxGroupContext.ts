// packages
import { createContext } from 'react';

// interface
export interface CheckboxChangeEvent {
  name: string;
  status: boolean;
}

export interface CheckboxGroupContextAbstract {
  disabled: boolean;
  isChecked: (name: string) => boolean;
  onChange?: (event: CheckboxChangeEvent) => void;
}

// 默认值需要保持一致，以防万一
export default createContext<CheckboxGroupContextAbstract | null>(null);
