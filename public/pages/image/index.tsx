// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Image from '../../../packages/Image';
import Loading from '../../../packages/Loading';
import Icon from '../../../packages/Icon';

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
        <Image
          width="100px"
          height="100px"
          mode="center"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="scaleToFill"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="aspectFill"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="aspectFit"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="widthFix"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </View>
      <Text className="demo-block__title">圆形图片</Text>
      <View className="demo-block__content">
        <Image
          width="100px"
          height="100px"
          mode="center"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="scaleToFill"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="aspectFill"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="aspectFit"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <Image
          width="100px"
          height="100px"
          mode="widthFix"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </View>
      <Text className="demo-block__title">加载提示</Text>
      <View className="demo-block__content">
        <Image width="100px" height="100px" loading={<Loading />} />
        <Image width="100px" height="100px" error={<Icon name="info" />} />
      </View>
    </View>
  );
};
