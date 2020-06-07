// packages
import React, {
  FunctionComponent,
  useContext,
  CSSProperties,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import Info from '../Info';
import { Switch, Case } from '../tools/Switch';
import TabbarContext from '../Tabbar/TabbarContext';
import './TabbarItem.css';

// 默认值填充属性
type renderIcon = (active: boolean) => ReactNode;

interface ExogenousTabbarItemProps {
  // 标签名称，作为匹配的标识符，默认情况下，使用自然序 index 匹配
  name?: number | string;
  // use render prop within complicated
  icon: string | renderIcon;
  // 容器类名，用以覆盖内部
  className?: string;
  // 传递 Info 组件
  dot?: boolean;
  info?: string;
  // 匹配状态，父组件 Tabbar 隐式传递
  active?: boolean;
  // 事件绑定，父组件 Tabbar 隐式传递
  onClick?: (event: any) => void;
}

type TabbarItemProps = ExogenousTabbarItemProps;

const TabbarItem: FunctionComponent<TabbarItemProps> = (props) => {
  const { active, className, children, icon, dot, info, onClick } = props;
  const { activeColor, inactiveColor } = useContext(TabbarContext);
  const style: CSSProperties = {
    // weired css
    flex: 1,
    color: active ? activeColor : inactiveColor,
  };
  const classnames = {
    container: clsx(className, 'van-tabbar-item', {
      'van-tabbar-item--active': active,
    }),
  };

  return (
    <View style={style} className={classnames.container} onClick={onClick}>
      {/* item icon */}
      <View className="van-tabbar-item__icon">
        <Switch>
          <Case in={typeof icon === 'string'}>
            <Icon
              name={icon as string}
              className="van-tabbar-item__icon__inner"
            />
          </Case>
          <Case default>
            {typeof icon === 'function' && icon(active as boolean)}
          </Case>
        </Switch>
        <Info dot={dot} info={info} className="van-tabbar-item__info" />
      </View>

      {/* item text */}
      <View className="van-tabbar-item__text">{children}</View>
    </View>
  );
};

export default TabbarItem;
