// packages
import React, { useState, CSSProperties } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Cell from '../../../packages/Cell';
import Popup from '../../../packages/Popup';

export default () => {
  // 懒得命名
  const [visibility, setVisibility] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
    visible6: false,
    visible7: false,
    visible8: false,
    visible9: false,
  });
  const stylesheets: Record<string, CSSProperties> = {
    horizontal: {
      height: '35%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    vertical: {
      width: '45%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    center: {
      width: '45%',
      height: '15%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Cell
          title="展示展出层"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible1: true }))}
        />
        <Popup
          position="center"
          overlay
          visible={visibility.visible1}
          style={stylesheets.center}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible1: false }))
          }
        >
          <View>内容在此</View>
        </Popup>
      </View>

      <Text className="demo-block__title">弹出位置</Text>
      <View className="demo-block__content">
        <Cell
          title="顶部弹出"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible2: true }))}
        />
        <Popup
          position="top"
          overlay
          visible={visibility.visible2}
          style={stylesheets.horizontal}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible2: false }))
          }
        >
          <View>内容在此</View>
        </Popup>

        <Cell
          title="底部弹出"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible3: true }))}
        />
        <Popup
          position="bottom"
          overlay
          visible={visibility.visible3}
          style={stylesheets.horizontal}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible3: false }))
          }
        >
          <View>内容在此</View>
        </Popup>

        <Cell
          title="左侧弹出"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible4: true }))}
        />
        <Popup
          position="left"
          overlay
          visible={visibility.visible4}
          style={stylesheets.vertical}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible4: false }))
          }
        >
          <View>内容在此</View>
        </Popup>

        <Cell
          title="右侧弹出"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible5: true }))}
        />
        <Popup
          position="right"
          overlay
          visible={visibility.visible5}
          style={stylesheets.vertical}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible5: false }))
          }
        >
          <View>内容在此</View>
        </Popup>
      </View>

      <Text className="demo-block__title">关闭图标</Text>
      <View className="demo-block__content">
        <Cell
          title="常规关闭图标"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible6: true }))}
        />
        <Popup
          overlay
          closable
          position="bottom"
          visible={visibility.visible6}
          style={stylesheets.horizontal}
          onClose={() => setVisibility((acc) => ({ ...acc, visible6: false }))}
        >
          <View>内容在此</View>
        </Popup>

        <Cell
          title="自定义图标"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible7: true }))}
        />
        <Popup
          overlay
          closable
          closeIcon="close"
          position="bottom"
          visible={visibility.visible7}
          style={stylesheets.horizontal}
          onClose={() => setVisibility((acc) => ({ ...acc, visible7: false }))}
        >
          <View>内容在此</View>
        </Popup>

        <Cell
          title="关闭图标位置"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible8: true }))}
        />
        <Popup
          overlay
          closable
          position="bottom"
          closeIconPosition="top-left"
          visible={visibility.visible8}
          style={stylesheets.horizontal}
          onClose={() => setVisibility((acc) => ({ ...acc, visible8: false }))}
        >
          <View>内容在此</View>
        </Popup>
      </View>

      <Text className="demo-block__title">圆角弹窗</Text>
      <View className="demo-block__content">
        <Cell
          title="圆角弹窗"
          isLink
          onClick={() => setVisibility((acc) => ({ ...acc, visible9: true }))}
        />
        <Popup
          position="bottom"
          overlay
          round
          visible={visibility.visible9}
          style={stylesheets.horizontal}
          onClickOverlay={() =>
            setVisibility((acc) => ({ ...acc, visible9: false }))
          }
        >
          <View>内容在此</View>
        </Popup>
      </View>
    </View>
  );
};
