// packages
import React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Field from '../../../packages/Field';
import Button from '../../../packages/Button';

export default () => {
  const button = (
    <Button size="small" type="info">
      发送
    </Button>
  );

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <Field title="文本" placeholder="请输入文本" />

      <Text className="demo-block__title">自定义类型</Text>
      <Field title="整数" placeholder="请输入整数" type="number" />
      <Field title="数字" placeholder="请输入数字" type="digit" />
      <Field title="身份证号" placeholder="请输入文本" type="idcard" />
      <Field title="密码" placeholder="请输入密码" type="text" password />

      <Text className="demo-block__title">禁用输入</Text>
      <Field title="文本" placeholder="输入框只读" readonly />
      <Field title="文本" placeholder="输入框禁用" disabled />

      <Text className="demo-block__title">显示图标</Text>
      <Field title="文本" placeholder="请输入文本" icon="smile-o" />
      <Field
        title="文本"
        placeholder="请输入文本"
        icon="bag-o"
        rightIcon="clock-o"
      />

      <Text className="demo-block__title">错误提示</Text>
      <Field title="用户名" placeholder="请输入文本" required error />
      <Field
        title="手机号"
        placeholder="请输入文本"
        required
        errorMessage="手机号格式错误"
      />

      <Text className="demo-block__title">插入按钮</Text>
      <Field
        title="短信验证码"
        placeholder="请输入短信验证码"
        button={button}
      />

      <Text className="demo-block__title">输入框内容对齐</Text>
      <Field title="用户名" placeholder="输入内容居中" />
      <Field title="用户名" placeholder="输入内容居中" inputAlign="center" />
      <Field title="用户名" placeholder="输入内容右对齐" inputAlign="right" />
    </View>
  );
};
