// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import CellGroup from '../../../packages/CellGroup';
import Cell from '../../../packages/Cell';
import Icon from '../../../packages/Icon';

export default () => {
  return (
    <View className="demo-block demo-block--cell">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <CellGroup>
          <Cell title="单元格" value="内容" />
          <Cell title="单元格" value="内容" label="描述信息" border={false} />
        </CellGroup>
      </View>
      <Text className="demo-block__title">单元格大小</Text>
      <View>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" size="large" label="描述信息" />
      </View>
      <Text className="demo-block__title">展示图标</Text>
      <View>
        <Cell title="单元格" icon={<Icon name="location-o" />} />
      </View>
      <Text className="demo-block__title">展示箭头</Text>
      <View>
        <Cell title="单元格" isLink rightIcon={<Icon name="arrow" />} />
        <Cell
          title="单元格"
          isLink
          value="内容"
          rightIcon={<Icon name="arrow" />}
        />
        <Cell
          title="单元格"
          isLink
          value="内容"
          rightIcon={<Icon name="arrow-down" />}
        />
      </View>
      <Text className="demo-block__title">垂直居中</Text>
      <View>
        <Cell center title="单元格" value="内容" label="描述信息" />
      </View>
      <Text className="demo-block__title">分组标题</Text>
      <View>
        <CellGroup title="分组1">
          <Cell title="单元格" value="内容" />
        </CellGroup>
        <CellGroup title="分组2">
          <Cell title="单元格" value="内容" />
        </CellGroup>
      </View>
    </View>
  );
};
