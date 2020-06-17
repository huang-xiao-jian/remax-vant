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
      {
        id: 4,
        text: '嘉兴',
      },
      {
        id: 5,
        text: '台州',
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
      {
        id: 4,
        text: ' 湖州',
      },
      {
        id: 5,
        text: ' 连云港',
      },
    ],
  },
];

export default () => {
  // demo1
  const [mainActiveIndex, setMainActiveIndex] = useState(0);
  const [activeId, setActiveId] = useState(0);

  // demo2
  const max = 3;
  const [mainActiveIndex1, setMainActiveIndex1] = useState(0);
  const [activeId1, setActiveId1] = useState<number[]>([]);

  const onClickNav = (index: number) => {
    setMainActiveIndex(index);
    setActiveId(0);
  };

  const onClickItem = (index: number) => {
    setActiveId(index);
  };

  const onClickNav1 = (index: number) => {
    setMainActiveIndex1(index);
    setActiveId1([]);
  };

  const onClickItem1 = (index: number) => {
    setActiveId1((acc) => {
      if (acc.includes(index)) {
        return acc.filter((_index) => _index !== index);
      }

      if (acc.length < max) {
        return acc.concat(index);
      }

      return acc;
    });
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">单选模式</Text>
      <TreeSelect
        height="230px"
        items={items}
        mainActiveIndex={mainActiveIndex}
        activeId={activeId}
        onClickNav={onClickNav}
        onClickItem={onClickItem}
      />

      <Text className="demo-block__title">多选模式</Text>
      <TreeSelect
        height="230px"
        items={items}
        mainActiveIndex={mainActiveIndex1}
        activeId={activeId1}
        onClickNav={onClickNav1}
        onClickItem={onClickItem1}
      />
    </View>
  );
};
