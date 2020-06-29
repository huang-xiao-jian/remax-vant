// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import NoticeBar from '../../../packages/NoticeBar';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <NoticeBar
          leftIcon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
      </View>
      <Text className="demo-block__title">通告栏模式</Text>
      <View>
        <NoticeBar
          mode="closeable"
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
        <NoticeBar
          mode="link"
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
      </View>
      <Text className="demo-block__title">禁用滚动</Text>
      <View>
        <NoticeBar
          wrapable={false}
          scrollable={false}
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
      </View>
      <Text className="demo-block__title">多行展示</Text>
      <View>
        <NoticeBar
          wrapable
          scrollable={false}
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
      </View>

      <Text className="demo-block__title">使用左右插槽</Text>
      <View>
        <NoticeBar
          leftIcon={<Text>[公告]</Text>}
          text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
        />
      </View>
    </View>
  );
};
