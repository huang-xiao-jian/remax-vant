// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Button from '../../../packages/Button';
import Icon from '../../../packages/Icon';

// icons
const icons = {
  builtIn: <Icon name="star-o" />,
  external: <Icon name="https://img.yzcdn.cn/vant/logo.png" />,
};

export default () => {
  return (
    <View className="demo-block demo-block--button">
      <Text className="demo-block__title">按钮类型</Text>
      <View className="demo-block__content">
        <Button type="default">默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="info">信息按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </View>
      <Text className="demo-block__title">朴素按钮</Text>
      <View className="demo-block__content">
        <Button plain type="primary">
          朴素按钮
        </Button>
        <Button plain type="info">
          朴素按钮
        </Button>
      </View>
      <Text className="demo-block__title">细边框</Text>
      <View className="demo-block__content">
        <Button plain hairline type="primary">
          细边框按钮
        </Button>
        <Button plain hairline type="info">
          细边框按钮
        </Button>
      </View>
      <Text className="demo-block__title">禁用状态</Text>
      <View className="demo-block__content">
        <Button disabled type="primary">
          禁用状态
        </Button>
        <Button disabled type="info">
          禁用状态
        </Button>
      </View>
      <Text className="demo-block__title">加载状态</Text>
      <View className="demo-block__content">
        <Button loading type="primary" />
        <Button loading type="primary" loadingType="spinner" />
        <Button loading type="info" loadingText="加载中..." />
      </View>
      <Text className="demo-block__title">按钮形状</Text>
      <View className="demo-block__content">
        <Button square type="primary">
          方形按钮
        </Button>
        <Button round type="info">
          圆形按钮
        </Button>
      </View>
      <Text className="demo-block__title">图标按钮</Text>
      <View className="demo-block__content">
        <Button type="primary" icon="star-o" />
        <Button type="primary" icon="star-o">
          按钮
        </Button>
        <Button plain type="info" icon="https://img.yzcdn.cn/vant/logo.png">
          按钮
        </Button>
      </View>
      <Text className="demo-block__title">按钮尺寸</Text>
      <View className="demo-block__content">
        <Button type="primary" size="large">
          大号按钮
        </Button>
        <Button type="primary" size="normal">
          普通按钮
        </Button>
        <Button type="primary" size="small">
          小型按钮
        </Button>
        <Button type="primary" size="mini">
          迷你按钮
        </Button>
      </View>
      <Text className="demo-block__title">块级元素</Text>
      <View className="demo-block__content">
        <Button type="primary" block>
          块级元素
        </Button>
      </View>
      <Text className="demo-block__title">自定义颜色</Text>
      <View className="demo-block__content">
        <Button color="#7232dd">单色按钮</Button>
        <Button color="#7232dd" plain>
          单色按钮
        </Button>
        <Button color="linear-gradient(to right, #4bb0ff, #6149f6)">
          渐变色按钮
        </Button>
      </View>
    </View>
  );
};
