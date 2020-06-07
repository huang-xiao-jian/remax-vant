// packages
import React, {
  FunctionComponent,
  CSSProperties,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import TabbarContext from './TabbarContext';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './Tabbar.css';

// 默认值填充属性
interface NeutralTabbarProps {
  fixed: boolean;
  border: boolean;
  zIndex: number;
  // pass down for tabbar item
  activeColor: string;
  inactiveColor: string;
  safeAreaInsetBottom: boolean;
}

// 暂且保持一致，active field 有歧义，考虑替换为 activeKey
interface ExogenousTabbarProps {
  // 选中索引
  active: number | string;
  // 容器类名，用以覆盖内部
  className?: string;
  // trigger on every item click
  onChange: (event: { detail: number }) => void;
}

type TabbarProps = NeutralTabbarProps & ExogenousTabbarProps;

const DefaultTabbarProps: NeutralTabbarProps = {
  fixed: true,
  border: true,
  safeAreaInsetBottom: true,
  zIndex: 1,
  // remember TabbarContext default value, createContext type mis-annotation
  activeColor: '#1989fa',
  inactiveColor: '#7d7e80',
};

// TODO - support name match machanism
const Tabbar: FunctionComponent<TabbarProps> = (props) => {
  const {
    className,
    border,
    fixed,
    safeAreaInsetBottom,
    zIndex,
    active,
    activeColor,
    inactiveColor,
    children,
    onChange,
  } = props;

  const style: CSSProperties = pickStyle({
    zIndex,
  });
  const classnames = {
    container: clsx(className, 'van-tabbar', {
      'van-tabbar--fixed': fixed,
      'van-tabbar--safe': safeAreaInsetBottom,
      'van-hairline--top-bottom': border,
    }),
  };
  const payload = {
    activeColor,
    inactiveColor,
  };
  const elements = Children.map(children, (child, index) =>
    !isValidElement(child)
      ? child
      : cloneElement(child, {
          active: active === child.props.name || active === index,
          onClick: () => onChange({ detail: child.props.name || index }),
        })
  );

  return (
    <TabbarContext.Provider value={payload}>
      <View style={style} className={classnames.container}>
        {elements}
      </View>
    </TabbarContext.Provider>
  );
};

export default withDefaultProps<ExogenousTabbarProps, NeutralTabbarProps>(
  DefaultTabbarProps
)(Tabbar);
