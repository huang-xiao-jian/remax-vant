// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactElement,
  useState,
} from 'react';
import clsx from 'clsx';
import { usePageInstance, useNativeEffect } from 'remax';
import { View, Navigator } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Switch, Case } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';
import './NoticeBar.css';

// 默认值填充属性
interface NeutralNoticeBarProps {
  mode: '' | 'closeable' | 'link';
  delay: number;
  speed: number;
  scrollable: boolean;
  color: string;
  backgroundColor: string;
  wrapable: boolean;
  openType:
    | 'navigate'
    | 'redirect'
    | 'switchTab'
    | 'reLaunch'
    | 'navigateBack'
    | 'exit'
    | undefined;
}

interface ExogenousNoticeBarProps {
  // left side icon
  leftIcon?: string | ReactElement;
  // right side
  rightIcon?: ReactElement;
  // navigator target
  url?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 容器事件监听
  onClick?: (event: any) => void;
}

type NoticeBarProps = NeutralNoticeBarProps & ExogenousNoticeBarProps;

const DefaultNoticeBarProps: NeutralNoticeBarProps = {
  mode: '',
  delay: 1,
  speed: 50,
  scrollable: true,
  color: '#ed6a0c',
  backgroundColor: '#fffbe8',
  wrapable: false,
  openType: 'navigate',
};

// TODO - find better way to support NoticeBar scroll animation
// TODO - resolve right icon drift from center
const NoticeBar: FunctionComponent<NoticeBarProps> = (props) => {
  const {
    className,
    mode,
    wrapable,
    color,
    leftIcon,
    rightIcon,
    backgroundColor,
    scrollable,
    openType,
    url,
    children,
    speed,
    delay,
    onClick,
  } = props;
  const classnames = {
    container: clsx(className, 'van-notice-bar', {
      'van-notice-bar--withicon': mode,
      'van-notice-bar--wrapable': wrapable,
    }),
    content: clsx('van-notice-bar__content', {
      'van-ellipsis': !scrollable && !wrapable,
    }),
  };
  const style: CSSProperties = {
    color,
    backgroundColor,
  };

  const page = usePageInstance();
  const [animation] = useState<any>();

  useNativeEffect(() => {
    // setAnimation()
    const query = page.createSelectorQuery();

    query.select('.van-notice-bar__content').boundingClientRect();
    query.select('.van-notice-bar__wrap').boundingClientRect();

    query.exec(
      (
        rects: [
          WechatMiniprogram.BoundingClientRectCallbackResult,
          WechatMiniprogram.BoundingClientRectCallbackResult
        ]
      ) => {
        const [contentRect, wrapRect] = rects;

        if (contentRect && wrapRect && contentRect.width && wrapRect.width) {
          if (scrollable && wrapRect.width < contentRect.width) {
            // const duration = (contentRect.width / speed) * 1000;
            // setAnimation(
            //   wx
            //     .createAnimation({
            //       duration: 0,
            //       timingFunction: 'linear',
            //     })
            //     .translateX(wrapRect.width)
            //     .step()
            //     .export()
            // );
            // wx.nextTick(() => {
            //   setAnimation(
            //     wx
            //       .createAnimation({
            //         duration,
            //         timingFunction: 'linear',
            //         delay,
            //       })
            //       .translateX(-contentRect.width)
            //       .step()
            //       .export()
            //   );
            // });
          }
        }
      }
    );
  }, [page, scrollable, speed, delay]);

  return (
    <View
      style={pickStyle(style)}
      className={classnames.container}
      onClick={onClick}
    >
      {/* left icon */}
      <Switch>
        <Case in={typeof leftIcon === 'string'}>
          <Icon
            name={leftIcon as string}
            size="16px"
            className="van-notice-bar__left-icon"
          />
        </Case>
        <Case default>{leftIcon}</Case>
      </Switch>
      {/* center content */}
      <View className="van-notice-bar__wrap">
        <View className="van-notice-bar__content" animation={animation}>
          {children}
        </View>
      </View>
      {/* right icon */}
      <Switch>
        <Case in={mode === 'closeable'}>
          <Icon name="cross" className="van-notice-bar__right-icon" />
        </Case>
        <Case in={mode === 'link'}>
          <Navigator url={url} openType={openType}>
            <Icon className="van-notice-bar__right-icon" name="arrow" />
          </Navigator>
        </Case>
        <Case default>{rightIcon}</Case>
      </Switch>
    </View>
  );
};

export default withDefaultProps<ExogenousNoticeBarProps, NeutralNoticeBarProps>(
  DefaultNoticeBarProps
)(NoticeBar);
