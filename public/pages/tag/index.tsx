// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Tag from '../../../packages/Tag';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Tag>标签</Tag>
        <Tag type="primary">标签</Tag>
        <Tag type="success">标签</Tag>
        <Tag type="danger">标签</Tag>
        <Tag type="warning">标签</Tag>
      </View>
      <Text className="demo-block__title">空心样式</Text>
      <View className="demo-block__content">
        <Tag plain>标签</Tag>
        <Tag plain type="primary">
          标签
        </Tag>
        <Tag plain type="success">
          标签
        </Tag>
        <Tag plain type="danger">
          标签
        </Tag>
        <Tag plain type="warning">
          标签
        </Tag>
      </View>
      <Text className="demo-block__title">圆角样式</Text>
      <View className="demo-block__content">
        <Tag round>标签</Tag>
        <Tag round type="primary">
          标签
        </Tag>
        <Tag round type="success">
          标签
        </Tag>
        <Tag round type="danger">
          标签
        </Tag>
        <Tag round type="warning">
          标签
        </Tag>
      </View>
      <Text className="demo-block__title">标记样式</Text>
      <View className="demo-block__content">
        <Tag mask>标签</Tag>
        <Tag mask type="primary">
          标签
        </Tag>
        <Tag mask type="success">
          标签
        </Tag>
        <Tag mask type="danger">
          标签
        </Tag>
        <Tag mask type="warning">
          标签
        </Tag>
      </View>
      <Text className="demo-block__title">标签大小</Text>
      <View className="demo-block__content">
        <Tag type="primary">标签</Tag>
        <Tag size="medium" type="primary">
          标签
        </Tag>
        <Tag size="large" type="primary">
          标签
        </Tag>
      </View>
    </View>
  );
};
