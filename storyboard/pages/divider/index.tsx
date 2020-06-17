// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Divider from '../../../packages/Divider';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Divider />
      </View>
      <Text className="demo-block__title">使用 hairline</Text>
      <View className="demo-block__content">
        <Divider hairline />
      </View>
      <Text className="demo-block__title">虚线</Text>
      <View className="demo-block__content">
        <Divider dashed />
      </View>
      <Text className="demo-block__title">文本位置</Text>
      <View className="demo-block__content">
        <Divider contentPostion="left">（づ￣3￣）</Divider>
        <Divider contentPostion="center">（づ￣3￣）</Divider>
        <Divider contentPostion="right">（づ￣3￣）</Divider>
      </View>
      <Text className="demo-block__title">自定义样式</Text>
      <View className="demo-block__content">
        <Divider
          style={{ color: '#1989fa', borderColor: '#1989fa', fontSize: '18px' }}
          contentPostion="center"
        >
          （づ￣3￣）
        </Divider>
      </View>
    </View>
  );
};
