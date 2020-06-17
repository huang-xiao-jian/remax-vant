// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Skeleton from '../../../packages/Skeleton';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Skeleton title row={3} rowWidth={['100%', '100%', '80%']} />
      </View>

      <Text className="demo-block__title">显示头像</Text>
      <View className="demo-block__content">
        <Skeleton title avatar row={3} />
      </View>
    </View>
  );
};
