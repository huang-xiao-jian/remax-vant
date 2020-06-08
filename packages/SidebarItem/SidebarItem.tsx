// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Info from '../Info';
import { Select } from '../tools/Switch';
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
  // 透传 Info 组件
  dot?: boolean;
  info?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // Sidebar 显式传入
  onClick?: (event: any) => void;
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
    info,
    dot,
    activeClassName,
    disabeldClassName,
    children,
    onClick,
  } = props;

  const visibility = {
    // original code
    info: info || dot,
  };
  const stylesheets: Record<'info', CSSProperties> = {
    info: {
      right: '4px;',
    },
  };
  const classnames = {
    container: clsx(
      className,
      'van-sidebar-item',
      // 链接状态类
      selected && activeClassName,
      disabled && disabeldClassName,
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
      <View className="van-sidebar-item__text">
        <Select in={visibility.info}>
          <Info dot={dot} info={info} style={stylesheets.info} />
        </Select>
        {children}
      </View>
    </View>
  );
};

export default withDefaultProps<
  ExogenousSidebarItemProps,
  NeutralSidebarItemProps
>(DefaultSidebarProps)(SidebarItem);
