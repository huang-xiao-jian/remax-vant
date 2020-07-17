/* eslint-disable no-console */
// packages
import React, { CSSProperties } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Button from '../../../packages/Button';
import Image from '../../../packages/Image';
import { Dialog, DialogProvider } from '../../../packages/Dialog';

export default () => {
  const title = 'FBI Waning';
  const message = '代码是写出来给人看的，附带能在机器上运行';

  const onClickAlert = () => {
    Dialog.alert({
      title,
      message,
      showCancelButton: true,
    })
      .then(() => {
        console.log('Alert confirmed!');
      })
      .catch(() => {
        console.log('Alert rejected!');
      });
  };

  const onClickAlertOverlay = () => {
    Dialog.alert({
      title,
      message,
      showCancelButton: true,
      closeOnClickOverlay: true,
    })
      .then(() => {
        console.log('Alert confirmed!');
      })
      .catch(() => {
        console.log('Alert rejected!');
      });
  };

  const onClickCustom = () => {
    Dialog.alert({
      title,
      message: (
        <View style={{ padding: '18px 12px' }}>
          <Image
            src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
            height="240px"
            width="100%"
          />
        </View>
      ),
    });
  };

  const onClickManually = () => {
    Dialog.any({
      title,
      message,
      visible: true,
      showCancelButton: true,
      onConfirm: () => {
        Dialog.any({
          confirmButtonLoading: true,
        });

        setTimeout(() => {
          Dialog.close();
        }, 1500);
      },
      onCancel: () => {
        Dialog.any({
          cancelButtonLoading: true,
        });

        setTimeout(() => {
          Dialog.close();
        }, 1500);
      },
    });
  };

  const style: CSSProperties = {
    marginBottom: 20,
  };

  return (
    <View className="demo-block">
      <DialogProvider />
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <View className="demo-block__content">
          <Button block style={style} onClick={onClickAlert}>
            标准提示
          </Button>
          <Button block type="info" style={style} onClick={onClickAlertOverlay}>
            遮罩层点击关闭
          </Button>
          <Button block type="info" style={style} onClick={onClickCustom}>
            自定义弹窗
          </Button>
          <Button block type="primary" style={style} onClick={onClickManually}>
            手动挡飙车
          </Button>
        </View>
      </View>
    </View>
  );
};
