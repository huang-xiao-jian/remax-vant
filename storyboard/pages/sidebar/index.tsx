// packages
import * as React from 'react';
import { View } from 'remax/wechat';

// internal
import Sidebar from '../../../packages/Sidebar';
import SidebarItem from '../../../packages/SidebarItem';

export default () => {
  const [activeKey, setActiveKey] = React.useState(0);
  const onChange = (index: number) => {
    setActiveKey(index);
  };

  return (
    <View className="demo-block">
      <View>
        <Sidebar activeKey={activeKey} onChange={onChange}>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
          <SidebarItem>标签名</SidebarItem>
        </Sidebar>
      </View>
    </View>
  );
};
