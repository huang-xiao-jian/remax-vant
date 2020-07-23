/* eslint-disable no-console */
// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Picker from '../../../packages/Picker';
import PickerColumn from '../../../packages/PickerColumn';
import { CandidateOption } from '../../../packages/PickerColumn/PickerColumn.interface';

export default () => {
  const cities: CandidateOption[] = [
    { title: '杭州', value: 'HZ' },
    { title: '宁波', value: 'NB' },
    { title: '温州', value: 'WZ' },
    { title: '嘉兴', value: 'JX' },
    { title: '湖州', value: 'HUZ' },
    { title: '金华', value: 'JH' },
    { title: '台州', value: 'TZ' },
    { title: '丽水', value: 'LS' },
    { title: '舟山', value: 'ZS' },
    { title: '义务', value: 'YW' },
    { title: '东阳', value: 'DY' },
  ];
  const days: CandidateOption[] = [
    { title: '周一', value: 'Monday' },
    { title: '周二', value: 'Tuesday' },
    { title: '周三', value: 'Wednesday' },
    { title: '周四', value: 'Thursday' },
    { title: '周五', value: 'Friday' },
    { title: '周六', value: 'Saturday' },
    { title: '周日', value: 'Sunday' },
  ];

  const [city, setCity] = useState('HZ');
  const [day, setDay] = useState('Tuesday');

  const onConfirm = () => {
    wx.showToast({
      title: 'Picker Confirmed',
    });
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <Picker onConfirm={onConfirm}>
        <PickerColumn
          options={days}
          value={day}
          onChange={(value) => setDay(value as string)}
        />
        <PickerColumn
          options={cities}
          value={city}
          onChange={(value) => setCity(value as string)}
        />
      </Picker>
    </View>
  );
};
