// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Row from '../../../packages/Row';
import Col from '../../../packages/Col';

export default () => {
  return (
    <View className="demo-block demo-block--layout">
      <Text className="demo-block__title">基础用法</Text>
      <View className="demo-block__content">
        <Row>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
        </Row>

        <Row>
          <Col span={4}>span: 4</Col>
          <Col span={10} offset={4}>
            offset: 4, span: 10
          </Col>
        </Row>

        <Row>
          <Col offset={12} span={12}>
            offset: 12, span: 12
          </Col>
        </Row>
      </View>
      <Text className="demo-block__title">设置列元素间距</Text>
      <View className="demo-block__content">
        <Row gutter={20}>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
          <Col span={8}>span: 8</Col>
        </Row>
      </View>
    </View>
  );
};
