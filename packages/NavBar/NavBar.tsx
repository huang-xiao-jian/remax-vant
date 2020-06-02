// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactNode,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Switch, Case } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './NavBar.css';

// 默认值填充属性
interface NeutralNavBarProps {
  leftArrow: boolean;
  fixed: boolean;
  placeholder: boolean;
  border: boolean;
  zIndex: number;
  safeAreaInsetTop: boolean;
}

interface ExogenousNavBarProps {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  // 自定义行内样式
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClickLeft?: (event: any) => void;
  onClickRight?: (event: any) => void;
}

type NavBarProps = NeutralNavBarProps & ExogenousNavBarProps;

const DefaultNavbarProps: NeutralNavBarProps = {
  leftArrow: false,
  fixed: false,
  placeholder: false,
  border: true,
  zIndex: 1,
  safeAreaInsetTop: true,
};

// TODO - find better way to resolve placeholder issue
const NavBar: FunctionComponent<NavBarProps> = (props) => {
  const {
    className,
    fixed,
    border,
    left,
    leftArrow,
    title,
    right,
    zIndex,
    placeholder,
    safeAreaInsetTop,
    style: styleIn,
    onClickLeft,
    onClickRight,
  } = props;
  const classnames = {
    container: clsx(className, 'van-nav-bar', {
      'van-nav-bar--fixed': fixed,
      'van-hairline--bottom': border,
    }),
  };
  const { statusBarHeight } = useMemo(() => wx.getSystemInfoSync(), []);
  const styleInside: CSSProperties = {
    paddingTop: safeAreaInsetTop ? `${statusBarHeight}px` : 0,
    zIndex,
  };
  const height = safeAreaInsetTop ? 44 + statusBarHeight : 44;
  const style = styleIn ? { ...styleIn, styleInside } : styleInside;

  return (
    <>
      {fixed && placeholder && <View style={{ height: `${height}px` }} />}
      <View style={style} className={classnames.container}>
        {/* left */}
        <View className="van-nav-bar__left" onClick={onClickLeft}>
          <Switch>
            <Case in={leftArrow || typeof left === 'string'}>
              {leftArrow && (
                <Icon
                  name="arrow-left"
                  size="16px"
                  className="van-nav-bar__arrow"
                />
              )}
              {typeof left === 'string' && (
                <View
                  className="van-nav-bar__text"
                  hoverClassName="van-nav-bar__text--hover"
                  hoverStayTime={70}
                >
                  {left}
                </View>
              )}
            </Case>
            <Case default>{left}</Case>
          </Switch>
        </View>
        {/* center */}
        <View className="van-nav-bar__title van-ellipsis">
          {typeof title === 'string' ? <Text>{title}</Text> : title}
        </View>
        {/* right */}
        <View className="van-nav-bar__right" onClick={onClickRight}>
          <Switch>
            <Case in={typeof right === 'string'}>
              <View
                className="van-nav-bar__text"
                hoverClassName="van-nav-bar__text--hover"
                hoverStayTime={70}
              >
                {right}
              </View>
            </Case>
            <Case default>{right}</Case>
          </Switch>
        </View>
      </View>
    </>
  );
};

export default withDefaultProps<ExogenousNavBarProps, NeutralNavBarProps>(
  DefaultNavbarProps
)(NavBar);
