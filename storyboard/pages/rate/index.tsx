// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Rate from '../../../packages/Rate';

export default () => {
  const [value, setValue] = useState(4);
  const onChange = (score: number) => setValue(score);

  const [value1, setValue1] = useState(3.5);
  const onChange1 = (score: number) => setValue1(score);

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Rate value={value} onChange={onChange} />
      </View>

      <Text className="demo-block__title">自定义图标</Text>
      <View className="demo-block__content">
        <Rate icon="like" voidIcon="like-o" value={value} onChange={onChange} />
      </View>

      <Text className="demo-block__title">自定义样式</Text>
      <View className="demo-block__content">
        <Rate
          size="24px"
          color="#ee0a24"
          voidColor="#eee"
          value={value}
          onChange={onChange}
        />
      </View>

      <Text className="demo-block__title">自定义数量</Text>
      <View className="demo-block__content">
        <Rate count={6} value={value} onChange={onChange} />
      </View>

      <Text className="demo-block__title">禁用状态</Text>
      <View className="demo-block__content">
        <Rate disabled value={value} onChange={onChange} />
      </View>

      <Text className="demo-block__title">只读状态</Text>
      <View className="demo-block__content">
        <Rate readonly value={value} onChange={onChange} />
      </View>

      <Text className="demo-block__title">半星</Text>
      <View className="demo-block__content">
        <Rate value={value1} allowHalf onChange={onChange1} />
      </View>
    </View>
  );
};
