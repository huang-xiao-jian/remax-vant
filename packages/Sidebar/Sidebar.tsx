// packages
import React, {
  FunctionComponent,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Sidebar.css';

// 默认值填充属性
interface SidebarProps {
  // 状态标记
  activeKey: number;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onChange: (event: { detail: number }) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const { className, activeKey, onChange, children } = props;
  const classnames = {
    container: clsx(className, 'van-sidebar'),
  };
  const elements = Children.map(children, (child, index) => {
    return !isValidElement(child)
      ? child
      : cloneElement(child, {
          selected: index === activeKey,
          onClick: () => onChange({ detail: index }),
        });
  });

  return <View className={classnames.container}>{elements}</View>;
};

export default Sidebar;
