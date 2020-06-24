// packages
import React, { CSSProperties } from 'react';
import { View } from 'remax/wechat';

// internal
import Button from '../../../packages/Button';
import { NotifyProvider, Notify } from '../../../packages/Notify';

export default () => {
  const style: CSSProperties = {
    marginTop: 20,
  };

  // 懒得命名了
  const onNotify1 = () => {
    Notify.notify('推送消息');
  };
  const onNotify2 = () => {
    Notify.notify({
      type: 'primary',
      message: '推送消息',
    });
  };
  const onNotify3 = () => {
    Notify.notify({
      type: 'success',
      message: '推送消息',
    });
  };
  const onNotify4 = () => {
    Notify.notify({
      type: 'danger',
      message: '推送消息',
    });
  };
  const onNotify5 = () => {
    Notify.notify({
      type: 'warning',
      message: '推送消息',
    });
  };
  const onNotify6 = () => {
    Notify.notify({
      message: '自定义颜色',
      color: '#ad0000',
      background: '#ffe1e1',
    });
  };

  const onNotify7 = () => {
    Notify.notify({
      duration: 1000,
      message: '自定义时长',
    });
  };

  return (
    <View className="demo-block">
      <View className="demo-block__content">
        <Button block style={style} onClick={onNotify1}>
          基础用法
        </Button>
        <Button block type="primary" style={style} onClick={onNotify2}>
          主要通知
        </Button>
        <Button block type="info" style={style} onClick={onNotify3}>
          成功通知
        </Button>
        <Button block type="danger" style={style} onClick={onNotify4}>
          危险通知
        </Button>
        <Button block type="warning" style={style} onClick={onNotify5}>
          警告通知
        </Button>
        <Button block type="primary" style={style} onClick={onNotify6}>
          自定义颜色
        </Button>
        <Button block type="primary" style={style} onClick={onNotify7}>
          自定义时长
        </Button>
      </View>
      <NotifyProvider />
    </View>
  );
};
