// packages
import React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Slider from '../../../packages/Slider';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Slider initialValue={50} />
      </View>
      <Text className="demo-block__title">指定选择范围</Text>
      <View className="demo-block__content">
        <Slider min={-50} max={50} />
      </View>
      <Text className="demo-block__title">禁用</Text>
      <View className="demo-block__content">
        <Slider initialValue={50} disabled />
      </View>
      <Text className="demo-block__title">指定步长</Text>
      <View className="demo-block__content">
        <Slider initialValue={50} step={10} />
      </View>
      <Text className="demo-block__title">自定义样式</Text>
      <View className="demo-block__content">
        <Slider initialValue={50} barHeight="4px" activeColor="#ee0a24" />
      </View>
    </View>
  );
};
