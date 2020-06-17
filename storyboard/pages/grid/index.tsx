// packages
import * as React from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Grid from '../../../packages/Grid';
import GridItem from '../../../packages/GridItem';
import Icon from '../../../packages/Icon';

export default () => {
  return (
    <View className="demo-block">
      <Text className="demo-block__title">基础用法</Text>
      <View>
        <Grid>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
        </Grid>
      </View>
      <Text className="demo-block__title">自定义列数</Text>
      <View>
        <Grid columnNum={3}>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
        </Grid>
      </View>
      <Text className="demo-block__title">正方形格子</Text>
      <View>
        <Grid square>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
          <GridItem>
            <View className="van-grid-item__icon">
              <Icon name="photo-o" />
            </View>
            <View className="van-grid-item__text">文字</View>
          </GridItem>
        </Grid>
      </View>
    </View>
  );
};
