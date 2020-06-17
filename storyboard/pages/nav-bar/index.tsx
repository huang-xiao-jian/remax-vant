// packages
import * as React from 'react';
import { View } from 'remax/wechat';

// internal
import NavBar from '../../../packages/NavBar';
import Icon from '../../../packages/Icon';

export default () => {
  const onClickFactory = (direction: 'left' | 'right') => () => {
    console.group('Navbar');
    console.log(direction);
    console.groupEnd();
  };

  return (
    <View className="demo-block">
      <View>
        <NavBar
          fixed
          safeAreaInsetTop={false}
          title="标题"
          left="返回"
          leftArrow
          onClickLeft={onClickFactory('left')}
          onClickRight={onClickFactory('right')}
          right={<Icon name="search" style={{ lineHeight: '44px' }} />}
        />
        <View>Hello World!</View>
        <View>Hello World!</View>
        <View>Hello World!</View>
        <View>Hello World!</View>
        <View>Hello World!</View>
      </View>
    </View>
  );
};
