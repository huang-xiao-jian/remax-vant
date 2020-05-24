// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Loading from '../../../packages/Loading';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">加载类型</Text>
      <View className="demo-loading">
        <Loading />
        <Loading type="spinner" />
      </View>
      <Text className="demo-block__title">加载文案水平</Text>
      <View className="demo-loading">
        <Loading message="加载中..." />
      </View>
      <Text className="demo-block__title">加载文案垂直分布</Text>
      <View className="demo-loading">
        <Loading vertical message="加载中..." />
        <Loading type="spinner" vertical message="加载中..." />
      </View>
    </View>
  );
};
