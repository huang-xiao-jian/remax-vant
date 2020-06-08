// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactNode,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Switch, Case, Select } from '../tools/Switch';
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
  title?: string | ReactNode;
  left?: string | ReactNode;
  right?: string | ReactNode;
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
    style: styleOut,
    onClickLeft,
    onClickRight,
  } = props;

  const { statusBarHeight } = useMemo(() => wx.getSystemInfoSync(), []);
  const height = safeAreaInsetTop ? 44 + statusBarHeight : 44;

  const visibilify: Record<string, boolean> = {
    placeholder: fixed && placeholder,
    leftArrow: !!leftArrow,
    leftText: typeof left === 'string',
    rightText: typeof right === 'string',
  };
  // style
  const stylesheets: Record<string, CSSProperties> = {
    placeholder: { height: `${height}px` },
    // eslint-disable-next-line prefer-object-spread
    container: Object.assign({}, styleOut, {
      paddingTop: safeAreaInsetTop ? `${statusBarHeight}px` : 0,
      zIndex,
    }),
  };
  // classname
  const classnames = {
    container: clsx(className, 'van-nav-bar', {
      'van-nav-bar--fixed': fixed,
      'van-hairline--bottom': border,
    }),
  };

  return (
    <>
      <Select in={visibilify.placeholder}>
        <View style={stylesheets.placeholder} />
      </Select>
      <View style={stylesheets.container} className={classnames.container}>
        {/* left */}
        <View className="van-nav-bar__left" onClick={onClickLeft}>
          <Switch>
            <Case in={visibilify.leftArrow || visibilify.leftText}>
              <Select in={visibilify.leftArrow}>
                <Icon
                  name="arrow-left"
                  size="16px"
                  className="van-nav-bar__arrow"
                />
              </Select>
              <Select in={visibilify.leftText}>
                <View
                  className="van-nav-bar__text"
                  hoverClassName="van-nav-bar__text--hover"
                  hoverStayTime={70}
                >
                  {left}
                </View>{' '}
              </Select>
            </Case>
            <Case default>{left}</Case>
          </Switch>
        </View>
        {/* shortcut implementation from origin */}
        <View className="van-nav-bar__title van-ellipsis">{title}</View>
        {/* right */}
        <View className="van-nav-bar__right" onClick={onClickRight}>
          <Switch>
            <Case in={visibilify.rightText}>
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
