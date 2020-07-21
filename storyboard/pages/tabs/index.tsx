// packages
import React, { useState, CSSProperties } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Tabs from '../../../packages/Tabs';
import Tab from '../../../packages/Tab';

export default () => {
  const units = [
    { name: 'a', title: '昨日逝' },
    { name: 'b', title: '今日行' },
    { name: 'c', title: '明日期' },
  ];
  const units1 = [
    { name: 'a', title: 'Java' },
    { name: 'b', title: 'Python' },
    { name: 'c', title: 'Go' },
    { name: 'd', title: 'Rust' },
    { name: 'e', title: 'CSS' },
    { name: 'f', title: 'Git' },
    { name: 'g', title: 'DevOps' },
    { name: 'h', title: 'JavaScript' },
    { name: 'i', title: 'WASM' },
    { name: 'j', title: 'Lisp' },
  ];
  const [value, setValue] = useState('a');
  const [value1, setValue1] = useState('a');
  const containerStyle: CSSProperties = {
    minHeight: '200vh',
  };
  const panelStyle: CSSProperties = {
    padding: '20px 16px',
    backgroundColor: '#fff',
  };

  return (
    <View className="demo-block" style={containerStyle}>
      <Text className="demo-block__title">基础用法</Text>
      <Tabs swipeable value={value} onChange={(_value) => setValue(_value)}>
        {units.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>

      <Text className="demo-block__title">卡片风格</Text>
      <Tabs type="card" value={value} onChange={(_value) => setValue(_value)}>
        {units.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>

      <Text className="demo-block__title">多栏标签</Text>
      <Tabs
        ellipsis={false}
        value={value1}
        onChange={(_value) => setValue1(_value)}
      >
        {units1.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>

      <Text className="demo-block__title">粘性布局</Text>
      <Tabs sticky value={value} onChange={(_value) => setValue(_value)}>
        {units.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>

      <Text className="demo-block__title">切换动画</Text>
      <Tabs animated value={value} onChange={(_value) => setValue(_value)}>
        {units.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>

      <Text className="demo-block__title">滑动切换</Text>
      <Tabs
        swipeable
        ellipsis={false}
        value={value1}
        onChange={(_value) => setValue1(_value)}
      >
        {units1.map((unit, index) => (
          <Tab
            key={unit.name}
            name={unit.name}
            title={unit.title}
            style={panelStyle}
          >
            {`内容 ${index}`}
          </Tab>
        ))}
      </Tabs>
    </View>
  );
};
