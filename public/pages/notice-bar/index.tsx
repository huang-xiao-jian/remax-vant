// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import NoticeBar from '../../../packages/NoticeBar';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <NoticeBar leftIcon="photo-o">
          足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
        </NoticeBar>
      </View>
      <Text className="demo-block__title">多行展示</Text>
      <View>
        <NoticeBar wrapable>
          足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
        </NoticeBar>
      </View>
      <Text className="demo-block__title">通告栏模式</Text>
      <View>
        <NoticeBar mode="closeable" leftIcon="photo-o">
          足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
        </NoticeBar>
        {/* <NoticeBar mode="link">
          足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
        </NoticeBar> */}
      </View>
    </View>
  );
};
