// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Tabbar from '../../../packages/Tabbar';
import TabbarItem from '../../../packages/TabbarItem';
import Image from '../../../packages/Image';

export default () => {
  const [activeIndex, seteActiveIndex] = useState(0);
  const [activeIndex1, seteActiveIndex1] = useState('home');

  const icons = {
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

  const renderHomeItemIcon = (active: boolean) =>
    active ? icons.active : icons.inactive;

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Tabbar
          className="demo-block__tabbar"
          active={activeIndex}
          safeAreaInsetBottom={false}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon="home-o">Home</TabbarItem>
          <TabbarItem icon="search">Search</TabbarItem>
          <TabbarItem icon="friends-o">Friends</TabbarItem>
          <TabbarItem icon="setting-o">Setting</TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">通过名称匹配</Text>
      <View>
        <Tabbar
          className="demo-block__tabbar"
          active={activeIndex1}
          safeAreaInsetBottom={false}
          onChange={(event) => seteActiveIndex1(event.detail)}
        >
          <TabbarItem name="home" icon="home-o">
            Home
          </TabbarItem>
          <TabbarItem name="search" icon="search">
            Search
          </TabbarItem>
          <TabbarItem name="friends" icon="friends-o">
            Friends
          </TabbarItem>
          <TabbarItem name="setting" icon="setting-o">
            Setting
          </TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">显示徽标</Text>
      <View>
        <Tabbar
          className="demo-block__tabbar"
          active={activeIndex}
          safeAreaInsetBottom={false}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon="home-o">Home</TabbarItem>
          <TabbarItem icon="search" dot>
            Search
          </TabbarItem>
          <TabbarItem icon="friends-o" info="5+">
            Friends
          </TabbarItem>
          <TabbarItem icon="setting-o" info="20+">
            Setting
          </TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">自定义图标</Text>
      <View>
        <Tabbar
          className="demo-block__tabbar"
          active={activeIndex}
          safeAreaInsetBottom={false}
          onChange={(event) => seteActiveIndex(event.detail)}
        >
          <TabbarItem icon={renderHomeItemIcon}>Home</TabbarItem>
          <TabbarItem icon="search">Search</TabbarItem>
          <TabbarItem icon="friends-o">Friends</TabbarItem>
          <TabbarItem icon="setting-o">Setting</TabbarItem>
        </Tabbar>
      </View>
      <Text className="demo-block__title">自定义颜色</Text>
      <View>
        <Tabbar
          className="demo-block__tabbar"
          active={activeIndex}
          activeColor="#07c160"
          inactiveColor="#000"
          safeAreaInsetBottom={false}
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
