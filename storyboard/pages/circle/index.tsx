// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Circle from '../../../packages/Circle';
import Button from '../../../packages/Button';

export default () => {
  const [value, setValue] = useState(40);
  const onClickMinus = () => {
    setValue((prev) => Math.max(0, prev - 5));
  };
  const onClickPlus = () => {
    setValue((prev) => Math.min(100, prev + 5));
  };
  const text = `${value}%`;

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Circle value={value} text={text} />
      </View>
      <Text className="demo-block__title">宽度定制</Text>
      <View className="demo-block__content">
        <Circle value={value} text={text} strokeWidth={6} />
      </View>
      <Text className="demo-block__title">颜色定制</Text>
      <View className="demo-block__content">
        <Circle value={value} text={text} layerColor="#eee" color="#ee0a24" />
      </View>
      <Text className="demo-block__title">渐变色</Text>
      <View className="demo-block__content">
        <Circle
          value={value}
          text={text}
          color={{
            '0%': '#ffd01e',
            '100%': '#ee0a24',
          }}
        />
      </View>
      <Text className="demo-block__title">逆时针</Text>
      <View className="demo-block__content">
        <Circle value={value} text={text} color="#07c160" clockwise={false} />
      </View>
      <Text className="demo-block__title">大小定制</Text>
      <View className="demo-block__content">
        <Circle value={value} text={text} size={120} />
      </View>

      <View className="demo-block__content">
        <Button
          type="info"
          block
          onClick={onClickPlus}
          style={{ marginTop: '20px' }}
        >
          增加
        </Button>
        <Button
          type="primary"
          block
          onClick={onClickMinus}
          style={{ marginTop: '10px' }}
        >
          减少
        </Button>
      </View>
    </View>
  );
};
