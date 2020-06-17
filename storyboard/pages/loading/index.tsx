// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Loading from '../../../packages/Loading';

export default () => {
  return (
    <View className="demo-block demo-block--loading">
      <Text className="demo-block__title">加载类型</Text>
      <View className="demo-block__content">
        <Loading />
        <Loading type="spinner" />
      </View>
      <Text className="demo-block__title">自定义颜色</Text>
      <View className="demo-block__content">
        <Loading color="#1989fa" />
        <Loading type="spinner" color="#1989fa" />
      </View>

      <Text className="demo-block__title">加载文案</Text>
      <View className="demo-block__content">
        <Loading size="24px">加载中...</Loading>
      </View>
      <Text className="demo-block__title">垂直排列</Text>
      <View className="demo-block__content">
        <Loading size="24px" vertical>
          加载中...
        </Loading>
      </View>
    </View>
  );
};
