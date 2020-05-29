// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Progress from '../../../packages/Progress';

export default () => {
  return (
    <View className="demo-block demo-block--progress">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Progress percentage={30} />
        <Progress percentage={45} />
      </View>
      <Text className="demo-block__title">置灰</Text>
      <View className="demo-block__content">
        <Progress percentage={60} inactive />
      </View>
      <Text className="demo-block__title">样式定制</Text>
      <View className="demo-block__content">
        <Progress percentage={30} />
      </View>
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Progress pivotText="橙色" color="#f2826a" percentage={80} />
        <Progress pivotText="红色" color="#ee0a24" percentage={74} />
        <Progress
          percentage={75}
          pivotText="紫色"
          pivotColor="#7232dd"
          color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </View>
    </View>
  );
};
