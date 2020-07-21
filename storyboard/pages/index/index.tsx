/**
 * @description - wechat preview
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React, { Fragment } from 'react';
import { View, Text } from 'remax/wechat';

// internal
import Cell from '../../../packages/Cell';
import Groups from './info';

function Index() {
  return (
    <View className="demo-block">
      {Groups.map((group) => (
        <Fragment key={group.groupName}>
          <Text className="demo-block__title">{group.groupName}</Text>
          {group.list.map((item) => (
            <Cell
              isLink
              key={item.path}
              title={item.title}
              url={`/pages/${item.path}/index`}
            />
          ))}
        </Fragment>
      ))}
    </View>
  );
}

export default Index;
