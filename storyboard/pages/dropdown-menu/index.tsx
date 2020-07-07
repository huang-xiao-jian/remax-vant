// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import DropdownMenu from '../../../packages/DropdownMenu';
import DropdownItem from '../../../packages/DropdownItem';

export default () => {
  const preset = {
    option1: [
      { text: '全部商品', value: '0' },
      { text: '新款商品', value: '1' },
      { text: '活动商品', value: '2' },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' },
    ],
  };
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('a');

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <DropdownMenu>
        <DropdownItem
          value={value1}
          category="商品"
          options={preset.option1}
          onChange={(value) => setValue1(value)}
        />
        <DropdownItem
          value={value2}
          category="排序"
          options={preset.option2}
          onChange={(value) => setValue2(value)}
        />
      </DropdownMenu>

      <Text className="demo-block__title">自定义颜色</Text>
      <DropdownMenu activeColor="#ee0a24">
        <DropdownItem
          value={value1}
          category="商品"
          options={preset.option1}
          onChange={(value) => setValue1(value)}
        />
        <DropdownItem
          value={value2}
          category="排序"
          options={preset.option2}
          onChange={(value) => setValue2(value)}
        />
      </DropdownMenu>

      <Text className="demo-block__title">向上展开</Text>
      <DropdownMenu activeColor="#ee0a24" direction="up">
        <DropdownItem
          value={value1}
          category="商品"
          options={preset.option1}
          onChange={(value) => setValue1(value)}
        />
        <DropdownItem
          value={value2}
          category="排序"
          options={preset.option2}
          onChange={(value) => setValue2(value)}
        />
      </DropdownMenu>

      <Text className="demo-block__title">警用菜单</Text>
      <DropdownMenu activeColor="#ee0a24">
        <DropdownItem
          value={value1}
          category="商品"
          options={preset.option1}
          onChange={(value) => setValue1(value)}
        />
        <DropdownItem
          value={value2}
          category="排序"
          disabled
          options={preset.option2}
          onChange={(value) => setValue2(value)}
        />
      </DropdownMenu>
    </View>
  );
};
