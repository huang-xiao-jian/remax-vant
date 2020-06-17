// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Image from '../../../packages/Image';
import Checkbox from '../../../packages/Checkbox';
import CheckboxGroup from '../../../packages/CheckboxGroup';
import CellGroup from '../../../packages/CellGroup';
import Cell from '../../../packages/Cell';
import { CheckboxChangeEvent } from '../../../packages/CheckboxGroup/CheckboxGroupContext';

export default () => {
  const [value, setValue] = useState(false);
  const onChangeSingle = (event: CheckboxChangeEvent) => {
    setValue(event.detail.status);
  };
  const [value1, setValue1] = useState<string[]>([]);
  const onChangeGroup = (event: CheckboxChangeEvent) => {
    const {
      detail: { name, status },
    } = event;
    const next = status
      ? value1.concat(name)
      : value1.filter((item) => item !== name);

    setValue1(next);
  };

  const icons = {
    activeIcon: (
      <Image mode="widthFix" src="https://img.yzcdn.cn/vant/user-active.png" />
    ),
    inactiveIcon: (
      <Image
        mode="widthFix"
        src="https://img.yzcdn.cn/vant/user-inactive.png"
      />
    ),
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基本用法</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="apple"
          value={value}
          onChange={onChangeSingle}
        >
          Apple
        </Checkbox>
      </View>

      <Text className="demo-block__title">禁用状态</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="banana"
          value={false}
          disabled
        >
          Banana
        </Checkbox>
        <Checkbox className="demo-block__checkbox" name="cherry" value disabled>
          Cherry
        </Checkbox>
      </View>

      <Text className="demo-block__title">自定义形状</Text>
      <View className="demo-block__content">
        <Checkbox className="demo-block__checkbox" name="lemon" shape="square">
          Lemon
        </Checkbox>
      </View>

      <Text className="demo-block__title">自定义颜色</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="menon"
          shape="square"
          value={value}
          checkedColor="#07c160"
        >
          Menon
        </Checkbox>
      </View>

      <Text className="demo-block__title">自定义大小</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="olive"
          iconSize="24px"
          value={value}
        >
          Olive
        </Checkbox>
      </View>

      <Text className="demo-block__title">自定义图标</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="pear"
          value={value}
          icon={value ? icons.activeIcon : icons.inactiveIcon}
        >
          Pear
        </Checkbox>
      </View>

      <Text className="demo-block__title">禁用文本点击</Text>
      <View className="demo-block__content">
        <Checkbox
          className="demo-block__checkbox"
          name="pomelo"
          value={value}
          labelDisabled
        >
          Pomelo
        </Checkbox>
      </View>

      <Text className="demo-block__title">复选框组</Text>
      <View className="demo-block__content">
        <CheckboxGroup value={value1} onChange={onChangeGroup}>
          <Checkbox className="demo-block__checkbox" name="pomelo">
            Pomelo
          </Checkbox>
          <Checkbox className="demo-block__checkbox" name="banana">
            Banana
          </Checkbox>
          <Checkbox className="demo-block__checkbox" name="cherry">
            Cherry
          </Checkbox>
        </CheckboxGroup>
      </View>

      <Text className="demo-block__title">搭配单元格组件使用</Text>
      <View className="demo-block__content">
        <CheckboxGroup value={value1} onChange={onChangeGroup}>
          <CellGroup>
            <Cell
              clickable
              title="Pomelo"
              rightIcon={<Checkbox name="pomelo" />}
            />
            <Cell
              clickable
              title="Banana"
              rightIcon={<Checkbox name="banana" />}
            />
            <Cell
              clickable
              title="Cherry"
              rightIcon={<Checkbox name="cherry" />}
            />
          </CellGroup>
        </CheckboxGroup>
      </View>
    </View>
  );
};
