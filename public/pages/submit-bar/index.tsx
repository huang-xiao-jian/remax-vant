// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import SubmitBar from '../../../packages/SubmitBar';

export default () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <SubmitBar
        tip="您的收货地址不支持同城送, 我们已为您推荐快递"
        tipIcon="question-o"
        price={2999}
        buttonText="提交订单"
        loading={loading}
        onSubmit={onSubmit}
      />
    </View>
  );
};
