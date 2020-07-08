// packages
import React, {
  FunctionComponent,
  CSSProperties,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';
import { useNativeEffect } from 'remax';
import { View, Navigator } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Switch, Case, Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import uuid from '../tools/uuid';
import { useTransition, NoticeBarActionTypes } from './use-transition';
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
  // 提示文字
  text: string;
  // left side icon
  leftIcon?: string | ReactElement;
  // right side
  rightIcon?: string | ReactElement;
  // navigator target
  url?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 容器事件监听
  onClick?: (event: any) => void;
}

type NoticeBarProps = NeutralNoticeBarProps & ExogenousNoticeBarProps;
type NoticeBarRects = [BoundingClientRectResult, BoundingClientRectResult];

const DefaultNoticeBarProps: NeutralNoticeBarProps = {
  mode: '',
  // 滚动效果延迟，单位 ms
  delay: 100,
  speed: 50,
  scrollable: true,
  color: '#ed6a0c',
  backgroundColor: '#fffbe8',
  wrapable: false,
  openType: 'navigate',
};

// TODO - 支持动态修改 speed
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
    text,
    speed,
    delay,
    onClick,
  } = props;

  // closable 信息栏
  const [visible, setVisible] = useState(true);
  // 限定查询范围
  const [contentID, wrapID] = useMemo(() => [uuid(), uuid()], []);
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      color,
      backgroundColor,
    },
  };
  const classnames = {
    container: clsx(className, 'van-notice-bar', {
      'van-notice-bar--withicon': mode,
      'van-notice-bar--wrapable': wrapable,
    }),
    content: clsx('van-notice-bar__content', {
      'van-ellipsis': !scrollable && !wrapable,
    }),
  };

  // 使用 CSS3 transition 处理动画，放弃微信动画 API
  const [transitionStyle, dispatch] = useTransition();

  const onClosableIcon = () => {
    setVisible(false);
  };

  const onTransitionEnd = () => {
    dispatch({
      type: NoticeBarActionTypes.Iteration,
    });
  };

  useNativeEffect(() => {
    // 恢复初始状态，静默 transition, transform 相关属性
    dispatch({
      type: NoticeBarActionTypes.Pristine,
    });

    // 微信 API 查询节点
    const qs = wx.createSelectorQuery();

    // 使用 ID 进行查询，支持多实例并存
    qs.select(`#${contentID}`).boundingClientRect();
    qs.select(`#${wrapID}`).boundingClientRect();
    qs.exec((rects: NoticeBarRects) => {
      const [contentRect, wrapRect] = rects;

      if (contentRect && wrapRect && contentRect.width && wrapRect.width) {
        if (scrollable && wrapRect.width < contentRect.width) {
          // 参数设置
          dispatch({
            type: NoticeBarActionTypes.Preset,
            payload: {
              delay,
              duration: (contentRect.width / speed) * 1000,
              warpWidth: wrapRect.width,
              contentWidth: contentRect.width,
            },
          });
          // 滚动启动
          dispatch({
            type: NoticeBarActionTypes.Drift,
          });
        }
      }
    });
  }, [scrollable, text]);

  return (
    <Select in={visible}>
      <View
        style={stylesheets.container}
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
        <View className="van-notice-bar__wrap" id={wrapID}>
          <View
            className={classnames.content}
            id={contentID}
            style={transitionStyle}
            onTransitionEnd={onTransitionEnd}
          >
            {text}
          </View>
        </View>

        {/* right icon */}
        <Switch>
          <Case in={mode === 'closeable'}>
            <View className="van-notice-bar__right-icon">
              <Icon name="cross" onClick={onClosableIcon} />
            </View>
          </Case>
          <Case in={mode === 'link'}>
            <Navigator url={url} openType={openType}>
              <View className="van-notice-bar__right-icon">
                <Icon name="arrow" />
              </View>
            </Navigator>
          </Case>
          <Case default>{rightIcon}</Case>
        </Switch>
      </View>
    </Select>
  );
};

export default withDefaultProps<ExogenousNoticeBarProps, NeutralNoticeBarProps>(
  DefaultNoticeBarProps
)(NoticeBar);
