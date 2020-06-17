// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Panel from '../../../packages/Panel';
import Button from '../../../packages/Button';
import Cell from '../../../packages/Cell';

export default () => {
  return (
    <View className="demo-block demo-block--panel">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Panel>
          <Panel.Header>
            <Cell title="标题" label="描述信息" value="状态" />
          </Panel.Header>
          <Panel.Content>
            <Text style={{ fontSize: '16px' }}>Text</Text>
          </Panel.Content>
          <Panel.Footer>
            <Button size="small" type="primary">
              确认
            </Button>
            <Button size="small" type="warning">
              取消
            </Button>
          </Panel.Footer>
        </Panel>
      </View>
    </View>
  );
};
