// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Button from '../../../packages/Button';
import Overlay from '../../../packages/Overlay';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Button onClick={() => setVisible(true)}>显示遮罩层</Button>
        <Overlay visible={visible}>
          <View style={{ padding: 20 }}>
            <Button type="info" block onClick={() => setVisible(false)}>
              关闭遮罩层
            </Button>
          </View>
        </Overlay>
      </View>
    </View>
  );
};
