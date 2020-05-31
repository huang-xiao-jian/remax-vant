// packages
import * as React from 'react';
import { View } from 'remax/wechat';

// internal
import Sidebar from '../../../packages/Sidebar';
import SidebarItem from '../../../packages/SidebarItem';

export default () => {
  return (
    <View className="demo-block">
      <View>
        <Sidebar initialActiveKey={0}>
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
