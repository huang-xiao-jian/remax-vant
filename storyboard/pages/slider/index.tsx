// packages
import React, { useState, CSSProperties } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Slider from '../../../packages/Slider';

export default () => {
  const [state, setState] = useState({
    base: 30,
    disabled: 30,
    step: 30,
    range: 0,
    customStyle: 20,
  });
  const onChangeFactory = (name: string) => (event: { detail: number }) => {
    setState((acc) => ({ ...acc, [name]: event.detail }));
  };
  const customButtonStyle: CSSProperties = {
    width: '26px',
    color: '#fff',
    fontSize: '10px',
    lineHeight: '18px',
    textAlign: 'center',
    borderRadius: '100px',
    backgroundColor: '#ee0a24',
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Slider value={state.base} onChange={onChangeFactory('base')} />
      </View>
      <Text className="demo-block__title">指定选择范围</Text>
      <View className="demo-block__content">
        <Slider
          min={-50}
          max={50}
          value={state.range}
          onChange={onChangeFactory('range')}
        />
      </View>
      <Text className="demo-block__title">禁用</Text>
      <View className="demo-block__content">
        <Slider value={state.disabled} disabled />
      </View>
      <Text className="demo-block__title">指定步长</Text>
      <View className="demo-block__content">
        <Slider
          value={state.step}
          step={10}
          onChange={onChangeFactory('step')}
        />
      </View>
      <Text className="demo-block__title">自定义样式</Text>
      <View className="demo-block__content">
        <Slider
          value={state.customStyle}
          barHeight="4px"
          activeColor="#ee0a24"
          onChange={onChangeFactory('customStyle')}
        />
      </View>

      <Text className="demo-block__title">自定义按钮</Text>
      <View className="demo-block__content">
        <Slider
          value={state.customStyle}
          barHeight="4px"
          activeColor="#ee0a24"
          onChange={onChangeFactory('customStyle')}
        >
          <View style={customButtonStyle}>{state.customStyle}</View>
        </Slider>
      </View>
    </View>
  );
};
