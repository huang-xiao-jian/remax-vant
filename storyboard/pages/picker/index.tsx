/* eslint-disable no-console */
// packages
import React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Picker from '../../../packages/Picker';

export default () => {
  const cities = [
    { name: '杭州' },
    { name: '宁波' },
    { name: '温州' },
    { name: '嘉兴' },
    { name: '湖州' },
    { name: '金华' },
    { name: '台州' },
    { name: '丽水' },
    { name: '舟山' },
    { name: '义务' },
    { name: '东阳' },
  ];
  const days = [
    { name: '周一' },
    { name: '周二' },
    { name: '周三' },
    { name: '周四' },
    { name: '周五' },
    { name: '周六' },
    { name: '周日' },
  ];
  const columns = [
    { key: 'day', initialIndex: 2, candidates: days },
    { key: 'city', initialIndex: 3, candidates: cities },
  ];

  const onConfirm = (event: any) => {
    wx.showToast({
      title: 'Picker Confirmed',
    });

    console.group('Picker');
    console.log(event);
    console.groupEnd();
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <Picker
        itemHeight={44}
        visibleItemCount={5}
        columns={columns}
        onConfirm={onConfirm}
      />
    </View>
  );
};
