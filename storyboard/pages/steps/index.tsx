// packages
import React, { useState } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Steps from '../../../packages/Steps';
import Icon from '../../../packages/Icon';

export default () => {
  const [active, setActive] = useState(0);
  const steps = [
    {
      text: '步骤一',
      desc: '描述信息',
    },
    {
      text: '步骤二',
      desc: '描述信息',
    },
    {
      text: '步骤三',
      desc: '描述信息',
    },
    {
      text: '步骤四',
      desc: '描述信息',
    },
  ];

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Steps
          steps={steps}
          active={active}
          onClickStep={(event) => setActive(event.detail)}
        />
      </View>
      <Text className="demo-block__title">竖向步骤条</Text>
      <View>
        <Steps direction="vertical" steps={steps} active={active} />
      </View>
      <Text className="demo-block__title">自定义样式</Text>
      <View>
        <Steps
          steps={steps}
          active={active}
          activeColor="#ee0a24"
          renderActiveCircle={(color) => <Icon name="success" color={color} />}
          renderInactiveCircel={(color) => (
            <Icon name="clock-o" color={color} />
          )}
        />
      </View>
    </View>
  );
};
