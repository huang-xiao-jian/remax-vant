// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Collapse from '../../../packages/Collapse';
import CollapseItem from '../../../packages/CollapseItem';

export default () => {
  const [state, setState] = useState<Record<string, string | string[]>>({
    basic: [],
    accordion: '',
    custom: [],
  });

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Collapse
          value={state.basic}
          onChange={(basic) => setState((acc) => ({ ...acc, basic }))}
        >
          <CollapseItem title="有赞微商城" name="item1">
            提供多样店铺模板，快速搭建网上商城
          </CollapseItem>
          <CollapseItem title="有赞零售" name="item2">
            线上拓客，随时预约，贴心顺手的开单收银
          </CollapseItem>
          <CollapseItem title="有赞美业" name="item3">
            网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
          </CollapseItem>
        </Collapse>
      </View>

      <Text className="demo-block__title">手风琴</Text>
      <View className="demo-block__content">
        <Collapse
          accordion
          value={state.accordion}
          onChange={(accordion) => setState((acc) => ({ ...acc, accordion }))}
        >
          <CollapseItem title="有赞微商城" name="item1">
            提供多样店铺模板，快速搭建网上商城
          </CollapseItem>
          <CollapseItem title="有赞零售" name="item2">
            线上拓客，随时预约，贴心顺手的开单收银
          </CollapseItem>
          <CollapseItem title="有赞美业" name="item3">
            网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
          </CollapseItem>
        </Collapse>
      </View>

      <Text className="demo-block__title">自定义</Text>
      <View className="demo-block__content">
        <Collapse
          value={state.custom}
          onChange={(custom) => setState((acc) => ({ ...acc, custom }))}
        >
          <CollapseItem title="有赞微商城" name="item1" icon="service-o">
            提供多样店铺模板，快速搭建网上商城
          </CollapseItem>
          <CollapseItem title="有赞零售" name="item2" icon="like-o">
            线上拓客，随时预约，贴心顺手的开单收银
          </CollapseItem>
          <CollapseItem
            title="有赞美业"
            name="item3"
            icon="shop-o"
            value="详情"
          >
            网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
          </CollapseItem>
        </Collapse>
      </View>
    </View>
  );
};
