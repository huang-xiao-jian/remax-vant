// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Switch from '../../../packages/Switch';

export default () => {
  const [checked, setChecked] = useState(true);
  const onChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Switch checked={checked} onChange={onChange} />
      </View>

      <Text className="demo-block__title">禁用状态</Text>
      <View className="demo-block__content">
        <Switch checked={checked} disabled onChange={onChange} />
      </View>

      <Text className="demo-block__title">加载状态</Text>
      <View className="demo-block__content">
        <Switch checked={checked} loading onChange={onChange} />
      </View>

      <Text className="demo-block__title">自定义大小</Text>
      <View className="demo-block__content">
        <Switch checked={checked} size="24px" onChange={onChange} />
      </View>
      <Text className="demo-block__title">自定义颜色</Text>
      <View className="demo-block__content">
        <Switch
          checked={checked}
          activeColor="#07c160"
          inactiveColor="#ee0a24"
          onChange={onChange}
        />
      </View>
    </View>
  );
};
