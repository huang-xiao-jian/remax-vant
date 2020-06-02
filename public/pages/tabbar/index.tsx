// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Tabbar from '../../../packages/Tabbar';
import TabbarItem from '../../../packages/TabbarItem';
import Image from '../../../packages/Image';

export default () => {
  const [activeIndex, seteActiveIndex] = useState(0);

  const customIcons = {
    inactive: (
      <Image
        src="https://img.yzcdn.cn/vant/user-inactive.png"
        width="18px"
        height="18px"
        mode="aspectFit"
      />
    ),
    active: (
      <Image
        src="https://img.yzcdn.cn/vant/user-active.png"
        width="18px"
        height="18px"
        mode="aspectFit"
      />
    ),
  };

  const iconFunction = (active: boolean) =>
    active ? customIcons.active : customIcons.inactive;

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Tabbar
          active={activeIndex}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon="home-o">Home</TabbarItem>
          <TabbarItem icon="search">Search</TabbarItem>
          <TabbarItem icon="friends-o">Friends</TabbarItem>
          <TabbarItem icon="setting-o">Setting</TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">显示徽标</Text>
      <View>
        <Tabbar
          active={activeIndex}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon="home-o">Home</TabbarItem>
          <TabbarItem icon="search" dot>
            Search
          </TabbarItem>
          <TabbarItem icon="friends-o" info="5+">
            Friends
          </TabbarItem>
          <TabbarItem icon="setting-o" info="99+">
            Setting
          </TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">自定义图标</Text>
      <View>
        <Tabbar
          active={activeIndex}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon={iconFunction}>Home</TabbarItem>
          <TabbarItem icon={iconFunction}>Search</TabbarItem>
          <TabbarItem icon={iconFunction}>Friends</TabbarItem>
          <TabbarItem icon={iconFunction}>Setting</TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">自定义颜色</Text>
      <View>
        <Tabbar
          active={activeIndex}
          activeColor="#07c160"
          inactiveColor="#000"
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon="home-o">Home</TabbarItem>
          <TabbarItem icon="search">Search</TabbarItem>
          <TabbarItem icon="friends-o">Friends</TabbarItem>
          <TabbarItem icon="setting-o">Setting</TabbarItem>
        </Tabbar>
      </View>
    </View>
  );
};
