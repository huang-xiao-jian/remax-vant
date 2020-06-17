// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Icon from '../../../packages/Icon';

export default () => {
  return (
    <View className="demo-block demo-block--icon">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Icon name="close" size="32px" />
        <Icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="32px" />
      </View>
      <Text className="demo-block__title">提示信息</Text>
      <View className="demo-block__content">
        <Icon name="chat" dot size="32px" />
        <Icon name="chat" message="9" size="32px" />
        <Icon name="chat" message="99+" size="32px" />
      </View>
      <Text className="demo-block__title">图标颜色</Text>
      <View className="demo-block__content">
        <Icon name="chat" size="32px" color="#3489fa" />
        <Icon name="chat" size="32px" color="#07c160" />
        <Icon name="chat" size="32px" color="#ee0a24" />
      </View>
      <Text className="demo-block__title">图标大小</Text>
      <View className="demo-block__content">
        <Icon name="chat" size="32px" />
        <Icon name="chat" size="40px" />
        <Icon name="chat" size="48px" />
      </View>
    </View>
  );
};
