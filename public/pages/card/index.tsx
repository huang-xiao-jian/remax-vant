// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Image from '../../../packages/Image';
import Tag from '../../../packages/Tag';
import Button from '../../../packages/Button';
import Card from '../../../packages/Card';

export default () => {
  const thumb = (
    <Image
      mode="aspectFit"
      className="van-card__img"
      src="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
    />
  );

  const tags = (
    <>
      <Tag plain type="danger">
        标签
      </Tag>
      <Tag plain type="danger">
        标签
      </Tag>
    </>
  );
  const footer = (
    <>
      <Button size="mini" round>
        按钮
      </Button>
      <Button size="mini" round>
        按钮
      </Button>
    </>
  );

  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <Card
        num={2}
        price="2.00"
        desc="描述信息"
        title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
        thumb={thumb}
      />
      <Text className="demo-block__title">高级用法</Text>
      <Card
        num="2"
        label="标签"
        price="2.00"
        originPrice="10.00"
        desc="描述信息"
        title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
        thumb={thumb}
        tags={tags}
        footer={footer}
      />
    </View>
  );
};
