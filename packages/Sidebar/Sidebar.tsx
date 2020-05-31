// packages
import React, {
  FunctionComponent,
  Children,
  ComponentType,
  cloneElement,
  isValidElement,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Sidebar.css';

// 默认值填充属性
interface SidebarProps {
  // 状态标记
  activeKey: number;
  // 事件回调
  onChange: (event: { detail: number }) => void;
  // 容器类名，用以覆盖内部
  className?: string;
}

interface TransparentNeutralListenerSidebarProps {
  // 状态标记
  activeKey?: number;
  // 默认受控组件
  initialActiveKey?: number;
  // 事件回调
  onChange?: (event: { detail: number }) => void;
  // 容器类名，用以覆盖内部
  className?: string;
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

// TODO - support controlled component
const withNeutralListener = (Component: ComponentType<SidebarProps>) => (
  props: PropsWithChildren<TransparentNeutralListenerSidebarProps>
) => {
  const { initialActiveKey, className, children } = props;
  const [activeKey, setActiveKey] = useState(initialActiveKey || 0);
  const handleChangeEvent = useCallback((event: { detail: number }) => {
    setActiveKey(event.detail);
  }, []);

  return (
    <Component
      className={className}
      activeKey={activeKey}
      onChange={handleChangeEvent}
    >
      {children}
    </Component>
  );
};

export default withNeutralListener(Sidebar);
