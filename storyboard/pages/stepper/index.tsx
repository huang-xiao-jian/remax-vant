// packages
import React, { useState } from 'react';
import { View } from 'remax/wechat';

// internal
import Cell from '../../../packages/Cell';
import Stepper from '../../../packages/Stepper';

export default () => {
  const [value, setValue] = useState(5);
  const onChange = (event: any) => {
    setValue(event.detail);
  };

  return (
    <View className="demo-block">
      <Cell
        title="基础用法"
        rightIcon={<Stepper value={value} onChange={onChange} />}
      />
      <Cell
        title="步长设置"
        rightIcon={<Stepper value={value} step={2} onChange={onChange} />}
      />

      <Cell
        title="限制输入范围"
        rightIcon={
          <Stepper value={value} min={1} max={8} onChange={onChange} />
        }
      />

      <Cell
        title="限制输入整数"
        rightIcon={<Stepper value={value} integer />}
      />

      <Cell title="禁用状态" rightIcon={<Stepper value={value} disabled />} />

      <Cell
        title="禁用长按"
        rightIcon={
          <Stepper value={value} longPress={false} onChange={onChange} />
        }
      />

      <Cell
        title="固定小数位数"
        rightIcon={
          <Stepper
            value={value}
            step={0.2}
            decimalLength={1}
            onChange={onChange}
          />
        }
      />

      <Cell
        title="自定义大小"
        rightIcon={
          <Stepper
            value={value}
            inputWith="40px"
            buttonSize="32px"
            onChange={onChange}
          />
        }
      />
    </View>
  );
};
