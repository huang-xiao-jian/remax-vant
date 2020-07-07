export interface DropdownItemOption {
  text: string;
  value: string;
  icon?: string;
}

// 头部 dropdown bar，数据来源为子组件上报
export interface DropdownMenuUnit {
  category: string;
  text?: string;
  disabled?: boolean;
}

// 点击回调事件
export interface DropdownMenuUnitEvent {
  currentTarget: {
    dataset: {
      category: string;
      disabled: boolean;
    };
  };
}

export interface DropdownItemOptionEvent {
  currentTarget: {
    dataset: {
      value: string;
      category: string;
    };
  };
}
