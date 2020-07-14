// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import { ToastProvider, Toast } from '../../../packages/Toast';
import Cell from '../../../packages/Cell';
import Button from '../../../packages/Button';
import ActionSheet from '../../../packages/ActionSheet';
import { ActionSheetItem } from '../../../packages/ActionSheet/ActionSheet.interface';

export default () => {
  const stylesheets = {
    container: {
      padding: '8px 12px 16px',
    },
    button: {
      marginTop: '10px',
    },
  };
  const [state, setState] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
  });
  const games1: ActionSheetItem[] = [
    { name: '英灵殿' },
    { name: '看门狗' },
    { name: '赛博朋克 2077', subname: '跳票' },
  ];
  const games2: ActionSheetItem[] = [
    { name: '英灵殿', color: '#07c160' },
    { name: '看门狗', loading: true },
    { name: '赛博朋克 2077', subname: '跳票', disabled: true },
  ];

  return (
    <View className="demo-block">
      <ToastProvider />
      <Text className="demo-block__title">示例用法</Text>
      <View className="demo-block__content">
        <Cell
          title="基础用法"
          onClick={() => setState((acc) => ({ ...acc, visible1: true }))}
        />
        <Cell
          title="选项状态"
          onClick={() => setState((acc) => ({ ...acc, visible2: true }))}
        />
        <Cell
          title="自定义面板"
          onClick={() => setState((acc) => ({ ...acc, visible3: true }))}
        />
      </View>
      <ActionSheet
        visible={state.visible1}
        description="选择新的开始"
        cancelText="取消"
        actions={games1}
        onClose={() => setState((acc) => ({ ...acc, visible1: false }))}
        onCancel={() => setState((acc) => ({ ...acc, visible1: false }))}
        onClickOverlay={() => setState((acc) => ({ ...acc, visible1: false }))}
        onSelect={(action) => {
          setState((acc) => ({ ...acc, visible1: false }));

          Toast.info(action.name);
        }}
      />
      <ActionSheet
        visible={state.visible2}
        actions={games2}
        cancelText="取消"
        onClose={() => setState((acc) => ({ ...acc, visible2: false }))}
        onCancel={() => setState((acc) => ({ ...acc, visible2: false }))}
        onClickOverlay={() => setState((acc) => ({ ...acc, visible2: false }))}
        onSelect={(action) => {
          setState((acc) => ({ ...acc, visible2: false }));

          Toast.info(action.name);
        }}
      />
      <ActionSheet
        title="自定义面板"
        visible={state.visible3}
        onClose={() => setState((acc) => ({ ...acc, visible3: false }))}
        onCancel={() => setState((acc) => ({ ...acc, visible3: false }))}
      >
        <View style={stylesheets.container}>
          <Button type="primary" block style={stylesheets.button}>
            博物馆
          </Button>
          <Button type="info" block style={stylesheets.button}>
            电影院
          </Button>
          <Button type="danger" block style={stylesheets.button}>
            下水道
          </Button>
        </View>
      </ActionSheet>
    </View>
  );
};
