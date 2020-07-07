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
  onChange: (index: number) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const { className, activeKey, children, onChange } = props;
  const classnames = {
    container: clsx(className, 'van-sidebar'),
  };
  const elements = Children.map(children, (child, index) =>
    !isValidElement(child)
      ? child
      : cloneElement(child, {
          selected: index === activeKey,
          onClick: () => onChange(index),
        })
  );

  return <View className={classnames.container}>{elements}</View>;
};

export default Sidebar;
