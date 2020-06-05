// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import CellGroup from '../../../packages/CellGroup';
import Cell from '../../../packages/Cell';
import Tag from '../../../packages/Tag';
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
        <Cell title="单元格" icon="location-o" />
      </View>
      <Text className="demo-block__title">展示箭头</Text>
      <View>
        <Cell title="单元格" isLink />
        <Cell title="单元格" isLink value="内容" />
        <Cell
          title="单元格"
          isLink
          value="内容"
          border={false}
          arrowDirection="down"
        />
      </View>
      <Text className="demo-block__title">分组标题</Text>
      <View>
        <CellGroup title="分组 1">
          <Cell title="单元格" icon="location-o" />
        </CellGroup>
        <CellGroup title="分组 2">
          <Cell title="单元格" icon="location-o" />
        </CellGroup>
      </View>

      <Text className="demo-block__title">使用插槽</Text>
      <View>
        <Cell
          isLink
          value="内容"
          icon="shop-o"
          title={<Tag type="danger">标签</Tag>}
        />
        <Cell title="单元格" border={false} icon={<Icon name="search" />} />
      </View>

      <Text className="demo-block__title">垂直居中</Text>
      <View>
        <Cell center title="单元格" value="内容" label="描述信息" />
      </View>
    </View>
  );
};
