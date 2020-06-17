// packages
import React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import SubmitBar from '../../../packages/SubmitBar';
import Tag from '../../../packages/Tag';

export default () => {
  const onSubmit = () => {
    wx.showToast({ title: '已提交' });
  };
  const advancedTip = (
    <>
      您的收货地址不支持同城送，
      <Text style={{ color: '#1989fa' }}>修改地址</Text>
    </>
  );

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <SubmitBar
        price={2999}
        buttonText="提交订单"
        className="demo-block__submit-bar"
        onSubmit={onSubmit}
      />

      <Text className="demo-block__title">禁用状态</Text>
      <SubmitBar
        disabled
        price={2999}
        className="demo-block__submit-bar"
        buttonText="提交订单"
        tip="您的收货地址不支持同城送, 我们已为您推荐快递"
        tipIcon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
        safeAreaInsetBottom={false}
      />

      <Text className="demo-block__title">加载状态</Text>
      <SubmitBar
        loading
        price={2999}
        buttonText="提交订单"
        safeAreaInsetBottom={false}
        className="demo-block__submit-bar"
      />

      <Text className="demo-block__title">高级用法</Text>
      <SubmitBar
        price={2999}
        buttonText="提交订单"
        tip={advancedTip}
        className="demo-block__submit-bar"
      >
        <Tag type="primary">标签</Tag>
      </SubmitBar>
    </View>
  );
};
