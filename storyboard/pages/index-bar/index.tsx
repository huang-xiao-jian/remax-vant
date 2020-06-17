// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import IndexBar from '../../../packages/IndexBar';
import IndexAnchor from '../../../packages/IndexAnchor';
import Cell from '../../../packages/Cell';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <IndexBar>
        <View>
          <IndexAnchor index="A">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="B">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="C">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="D">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="F">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="H">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="W">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
        <View>
          <IndexAnchor index="Z">标题 1</IndexAnchor>
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
          <Cell title="文本" />
        </View>
      </IndexBar>
    </View>
  );
};
