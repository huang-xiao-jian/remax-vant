// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import { TimePicker, DatePicker } from '../../../packages/DatetimePicker';
import {
  TimePickerPayload,
  DatePickerPayload,
} from '../../../packages/DatetimePicker/DatetimePicker.interface';

// scope
const today = new Date();

export default () => {
  const [time, setTime] = useState<TimePickerPayload>({
    hour: 6,
    minute: 15,
    second: 15,
  });

  const [date, setDate] = useState<DatePickerPayload>({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <TimePicker
          value={time}
          onChange={(value) => setTime((acc) => ({ ...acc, ...value }))}
        />
      </View>

      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <DatePicker
          value={date}
          onChange={(value) => setDate((acc) => ({ ...acc, ...value }))}
        />
      </View>
    </View>
  );
};
