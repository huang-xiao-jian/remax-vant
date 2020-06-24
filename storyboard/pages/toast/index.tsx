// packages
import React, { CSSProperties } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Button from '../../../packages/Button';

import { ToastProvider, Toast } from '../../../packages/Toast';

export default () => {
  const onTextToast = () => Toast.info('提示内容');
  const onLongTextToast = () =>
    Toast.info('这是一条长文字提示，超过一定字数就会换行');
  const onLoadingToast = () => {
    Toast.loading({ mask: true, message: '加载中...' });
  };
  const onAlterLoadingToast = () => {
    Toast.loading({ mask: true, loadingType: 'spinner', message: '加载中...' });
  };

  const onSuccessToast = () => {
    Toast.success('成功文案');
  };

  const onFailToast = () => {
    Toast.fail('失败提示');
  };

  const onDynamicToast = () => {
    let second = 5;

    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: `倒计时 ${second} 秒`,
    });

    const timer = setInterval(() => {
      second -= 1;

      if (second) {
        Toast.loading({ message: `倒计时 ${second} 秒` });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);
  };

  const style: CSSProperties = {
    marginBottom: 20,
  };

  return (
    <View className="demo-block">
      <ToastProvider />
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Button block onClick={onTextToast} style={style}>
          文字提示
        </Button>
        <Button block type="info" onClick={onLongTextToast} style={style}>
          长文字提示
        </Button>
        <Button block type="info" onClick={onLoadingToast} style={style}>
          加载提示
        </Button>
        <Button block type="info" onClick={onAlterLoadingToast} style={style}>
          自定义图标
        </Button>
        <Button block type="primary" onClick={onSuccessToast} style={style}>
          成功提示
        </Button>
        <Button block type="warning" onClick={onFailToast} style={style}>
          失败提示
        </Button>
        <Button block type="danger" onClick={onDynamicToast} style={style}>
          动态更新提示
        </Button>
      </View>
    </View>
  );
};
