// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import NavBar from '../../../packages/NavBar';
import Icon from '../../../packages/Icon';

export default () => {
  return (
    <View className="demo-block">
      <View>
        <NavBar
          fixed
          placeholder
          title="标题"
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
