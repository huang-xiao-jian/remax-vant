// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

import Image from '../../../packages/Image';
import Loading from '../../../packages/Loading';

// scope
const modes = [
  'aspectFit',
  'aspectFill',
  'scaleToFill',
  'center',
  'widthFix',
  'widthFix',
];

export default () => {
  return (
    <View className="demo-block demo-block--image">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Image
          width="100px"
          height="100px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </View>
      <Text className="demo-block__title">填充模式</Text>
      <View className="demo-block__content">
        {modes.map((mode) => (
          <Image
            key={mode}
            mode={mode}
            width="100px"
            height="100px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        ))}
      </View>
      <Text className="demo-block__title">圆形图片</Text>
      <View className="demo-block__content">
        {modes.map((mode) => (
          <Image
            round
            key={mode}
            mode={mode}
            width="100px"
            height="100px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        ))}
      </View>
      <Text className="demo-block__title">加载提示</Text>
      <View className="demo-block__content">
        <Image width="100px" height="100px" />
        <Image
          width="100px"
          height="100px"
          loading={<Loading type="spinner" size="20px" vertical />}
        />
      </View>
      <Text className="demo-block__title">加载失败提示</Text>
      <View className="demo-block__content">
        <Image src="http://404.cn" width="100px" height="100px" />
        <Image
          src="http://404.cn"
          width="100px"
          height="100px"
          error="加载失败"
        />
      </View>
    </View>
  );
};
