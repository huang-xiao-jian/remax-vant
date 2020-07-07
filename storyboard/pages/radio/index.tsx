// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import RadioGroup from '../../../packages/RadioGroup';
import Radio from '../../../packages/Radio';
import CellGroup from '../../../packages/CellGroup';
import Cell from '../../../packages/Cell';

export default () => {
  const [value, setValue] = useState('home');
  const onChange = (name: string) => {
    setValue(name);
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} onChange={onChange}>
          <Radio name="home" className="demo-block__radio">
            Home
          </Radio>
          <Radio name="photo" className="demo-block__radio">
            Photo
          </Radio>
          <Radio name="message" className="demo-block__radio">
            Message
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">禁用状态</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} disabled onChange={onChange}>
          <Radio name="home" className="demo-block__radio">
            Home
          </Radio>
          <Radio name="photo" className="demo-block__radio">
            Photo
          </Radio>
          <Radio name="message" className="demo-block__radio">
            Message
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">自定义形状</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} onChange={onChange}>
          <Radio name="home" shape="square" className="demo-block__radio">
            Home
          </Radio>
          <Radio name="photo" shape="square" className="demo-block__radio">
            Photo
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">自定义颜色</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} onChange={onChange}>
          <Radio
            name="home"
            checkedColor="#07c160"
            className="demo-block__radio"
          >
            Home
          </Radio>
          <Radio
            name="photo"
            checkedColor="#07c160"
            className="demo-block__radio"
          >
            Photo
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">自定义大小</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} onChange={onChange}>
          <Radio name="home" className="demo-block__radio" iconSize="16px">
            Home
          </Radio>
          <Radio name="photo" className="demo-block__radio" iconSize="24px">
            Photo
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">警用文本点击</Text>
      <View className="demo-block__content">
        <RadioGroup value={value} onChange={onChange}>
          <Radio
            name="home"
            labelDisabled
            checkedColor="#07c160"
            className="demo-block__radio"
          >
            Home
          </Radio>
          <Radio
            name="photo"
            labelDisabled
            checkedColor="#07c160"
            className="demo-block__radio"
          >
            Photo
          </Radio>
        </RadioGroup>
      </View>

      <Text className="demo-block__title">与 Cell 组件使用</Text>
      <View className="demo-block__content">
        <RadioGroup value={value}>
          <CellGroup>
            <Cell
              title="Home"
              clickable
              rightIcon={<Radio name="home" />}
              onClick={() => setValue('home')}
            />
            <Cell
              title="Setting"
              clickable
              rightIcon={<Radio name="setting" />}
              onClick={() => setValue('setting')}
            />
          </CellGroup>
        </RadioGroup>
      </View>
    </View>
  );
};
