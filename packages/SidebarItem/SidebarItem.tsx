// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import './SidebarItem.css';

// 默认值填充属性
interface NeutralSidebarItemProps {
  disabled: boolean;
  // Sidebar 显式传入
  selected: boolean;
}

interface ExogenousSidebarItemProps {
  // 暴露状态类
  activeClassName?: string;
  disabeldClassName?: string;
  // Sidebar 显式传入
  onClick?: (event: any) => void;
  // 容器类名，用以覆盖内部
  className?: string;
}

type SidebarItemProps = NeutralSidebarItemProps & ExogenousSidebarItemProps;

const DefaultSidebarProps: NeutralSidebarItemProps = {
  disabled: false,
  selected: false,
};
const SidebarItem: FunctionComponent<SidebarItemProps> = (props) => {
  const {
    className,
    disabled,
    selected,
    activeClassName,
    disabeldClassName,
    onClick,
    children,
  } = props;
  const classnames = {
    container: clsx(
      className,
      // 链接状态类
      selected && activeClassName,
      disabled && disabeldClassName,
      'van-sidebar-item',
      {
        'van-sidebar-item--selected': selected,
        'van-sidebar-item--disabled': disabled,
      }
    ),
  };

  return (
    <View
      className={classnames.container}
      hoverClassName="van-sidebar-item--hover"
      hoverStayTime={70}
      onClick={onClick}
    >
      <View className="van-sidebar-item__text">{children}</View>
    </View>
  );
};

export default withDefaultProps<
  ExogenousSidebarItemProps,
  NeutralSidebarItemProps
>(DefaultSidebarProps)(SidebarItem);
