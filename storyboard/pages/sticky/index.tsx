// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Sticky from '../../../packages/Sticky';
import Cell from '../../../packages/Cell';

export default () => {
  return (
    <View className="demo-block demo-block--sticky">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Sticky>
          <Cell title="Sticky Anchor" />
        </Sticky>
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
        <Cell title="文本" />
      </View>
    </View>
  );
};
