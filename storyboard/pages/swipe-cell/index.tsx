// packages
import React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import CellGroup from '../../../packages/CellGroup';
import Cell from '../../../packages/Cell';
import Button from '../../../packages/Button';
import Image from '../../../packages/Image';
import Card from '../../../packages/Card';
import SwipeCell from '../../../packages/SwipeCell';

export default () => {
  const left = <Button type="info">收藏</Button>;
  const right = (
    <>
      <Button type="info" style={{ height: '100%' }}>
        收藏
      </Button>
      <Button type="danger" style={{ height: '100%' }}>
        删除
      </Button>
    </>
  );

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <SwipeCell name="2048" left={left} right={right}>
          <CellGroup>
            <Cell title="太平洋土著" />
          </CellGroup>
        </SwipeCell>
      </View>

      <Text className="demo-block__title">基础用法</Text>
      <View>
        <SwipeCell name="二氧化碳" right={right}>
          <Card
            num={2}
            price="2.00"
            desc="描述信息"
            title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
            className="demo-block__card"
            thumb={
              <Image
                mode="aspectFit"
                className="van-card__img"
                src="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
              />
            }
          />
        </SwipeCell>
      </View>
    </View>
  );
};
