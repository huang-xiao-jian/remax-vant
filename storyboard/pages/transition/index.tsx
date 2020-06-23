// packages
import React, { useState, useMemo } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Cell from '../../../packages/Cell';
import Button from '../../../packages/Button';
import Transition from '../../../packages/Transition';
import './index.css';

export default () => {
  const [state, setState] = useState({
    visible: false,
    name: 'fade',
  });
  const style = useMemo(() => ({ paddingTop: 20 }), []);
  const onClickFactory = (name: string) => () => {
    setState((acc) => ({ ...acc, name, visible: true }));
    setTimeout(() => {
      setState((acc) => ({ ...acc, name, visible: false }));
    }, 1500);
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Cell title="Fade" onClick={onClickFactory('van-fade')} isLink />
        <Cell title="Fade Up" onClick={onClickFactory('van-fade-up')} isLink />
        <Cell
          title="Fade Down"
          onClick={onClickFactory('van-fade-down')}
          isLink
        />
        <Cell
          title="Fade Left"
          onClick={onClickFactory('van-fade-left')}
          isLink
        />
        <Cell
          title="Fade Right"
          onClick={onClickFactory('van-fade-right')}
          isLink
        />
        <Cell
          title="Slide Up"
          onClick={onClickFactory('van-slide-up')}
          isLink
        />
        <Cell
          title="Slide Down"
          onClick={onClickFactory('van-slide-down')}
          isLink
        />
        <Cell
          title="Slide Left"
          onClick={onClickFactory('van-slide-left')}
          isLink
        />
        <Cell
          title="Slide Right"
          onClick={onClickFactory('van-slide-right')}
          isLink
        />
        <Cell title="Dance" onClick={onClickFactory('dance')} isLink />
      </View>
      <View className="demo-block__content" style={style}>
        <Transition visible={state.visible} name={state.name} duration={500}>
          <Button block type="primary">
            主要按钮
          </Button>
        </Transition>
      </View>
    </View>
  );
};
