// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import TreeSelect from '../../../packages/TreeSelect';

// scope
const items = [
  {
    // 导航名称
    text: '浙江',
    // 该导航下所有的可选项
    children: [
      {
        id: 1,
        text: '温州',
      },
      {
        id: 2,
        text: '杭州',
      },
      {
        id: 3,
        text: ' 千岛湖',
      },
    ],
  },
  {
    // 导航名称
    text: '江苏',
    // 该导航下所有的可选项
    children: [
      {
        id: 1,
        text: '南京',
      },
      {
        id: 2,
        text: '无锡',
      },
      {
        id: 3,
        text: ' 湖州',
      },
    ],
  },
];

export default () => {
  const [mainActiveIndex, setMainActiveIndex] = useState(0);
  const [activeId, setActiveId] = useState(0);

  const onClickNav = (event: { detail: number }) => {
    setMainActiveIndex(event.detail);
    setActiveId(0);
  };

  const onClickItem = (event: { detail: number }) => {
    setActiveId(event.detail);
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <TreeSelect
          items={items}
          mainActiveIndex={mainActiveIndex}
          activeId={activeId}
          onClickNav={onClickNav}
          onClickItem={onClickItem}
        />
      </View>
    </View>
  );
};
