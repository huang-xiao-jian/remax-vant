// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import GoodsAction from '../../../packages/GoodsAction';
import GoodsActionButton from '../../../packages/GoodsActionButton';
import GoodsActionIcon from '../../../packages/GoodsActionIcon';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <GoodsAction
        className="demo-block__goods-action"
        safe-area-inset-bottom="{{ false }}"
      >
        <GoodsActionIcon icon="chat-o" text="客服" open-type="contact" />
        <GoodsActionIcon icon="cart-o" text="购物车" />
        <GoodsActionButton text="加入购物车" type="warning" />
        <GoodsActionButton text="立即购买" />
      </GoodsAction>

      <Text className="demo-block__title">提示信息</Text>
      <GoodsAction
        className="demo-block__goods-action"
        safe-area-inset-bottom="{{ false }}"
      >
        <GoodsActionIcon icon="chat-o" text="客服" dot />
        <GoodsActionIcon icon="cart-o" text="购物车" info="5" />
        <GoodsActionIcon icon="shop-o" text="店铺" />
        <GoodsActionButton text="加入购物车" type="warning" />
        <GoodsActionButton text="立即购买" />
      </GoodsAction>

      <Text className="demo-block__title">自定义按钮颜色</Text>
      <GoodsAction
        className="demo-block__goods-action"
        safe-area-inset-bottom="{{ false }}"
      >
        <GoodsActionIcon icon="chat-o" text="客服" />
        <GoodsActionIcon icon="shop-o" text="店铺" />
        <GoodsActionButton color="#be99ff" type="warning" text="加入购物车" />
        <GoodsActionButton color="#7232dd" text="立即购买" />
      </GoodsAction>

      <Text className="demo-block__title">朴素按钮</Text>
      <GoodsAction
        className="demo-block__goods-action"
        safe-area-inset-bottom="{{ false }}"
      >
        <GoodsActionIcon icon="chat-o" text="客服" />
        <GoodsActionIcon icon="shop-o" text="店铺" />
        <GoodsActionButton color="#7232dd" text="加入购物车" type="warning" />
        <GoodsActionButton plain color="#7232dd" text="立即购买" />
      </GoodsAction>
    </View>
  );
};
