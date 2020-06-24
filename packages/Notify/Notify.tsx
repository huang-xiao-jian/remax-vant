/* eslint-disable import/prefer-default-export */
// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useMemo,
  useState,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Transition from '../Transition';
import { Select } from '../tools/Switch';
import './Notify.css';

// 默认值填充属性

interface NotifyOptions {
  type: 'primary' | 'success' | 'warning' | 'danger';
  message: string;
  duration: number;
  color: string;
  top: number;
  background?: string;
  zIndex: number;
  safeAreaInsetTop: boolean;
  // 显示开关
  visible: boolean;
  // 容器类名，用以覆盖内部
  className?: string;
}

const NotifyBox: FunctionComponent<NotifyOptions> = (props) => {
  const {
    className,
    zIndex,
    visible,
    top,
    type,
    background,
    color,
    message,
    safeAreaInsetTop,
  } = props;
  const { statusBarHeight } = useMemo(() => wx.getSystemInfoSync(), []);
  const classnames = {
    container: clsx(className, 'van-notify__container'),
    notify: clsx('van-notify', `van-notify--${type}`),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      zIndex,
      top: `${top}px`,
    },
    notify: {
      color,
      background,
    },
    safeArea: {
      height: statusBarHeight,
    },
  };

  return (
    <Transition
      name="van-slide-down"
      visible={visible}
      className={classnames.container}
    >
      <View style={stylesheets.notify} className={classnames.notify}>
        <Select in={safeAreaInsetTop}>
          <View style={stylesheets.safeArea} />
        </Select>
        <Text>{message}</Text>
      </View>
    </Transition>
  );
};

const DefaultNotifyOptions: NotifyOptions = {
  type: 'danger',
  message: '1.0.0',
  duration: 2000,
  color: '#fff',
  top: 0,
  zIndex: 1000,
  visible: false,
  safeAreaInsetTop: false,
};

type ToastParam = string | Partial<NotifyOptions>;
type Subscriber = (options: NotifyOptions) => void;

const parseOptions: (options: ToastParam) => Partial<NotifyOptions> = (
  options
) => {
  return typeof options === 'string' ? { message: options } : options;
};

// 目前仅支持单个 Notify
class NotifyManager {
  public options: NotifyOptions;

  private queue: Subscriber[];

  private timer: number | null;

  constructor(options: NotifyOptions) {
    this.options = options;
    this.queue = [];
    this.timer = null;
  }

  private pipe(options: Partial<NotifyOptions>) {
    if (this.queue.length === 0) {
      throw new Error('NotifyProvider required');
    }

    // 重置延迟关闭
    if (typeof this.timer === 'number') {
      clearInterval(this.timer);
    }

    this.options = { ...this.options, ...options };
    this.queue.forEach((callback) => {
      callback(this.options);
    });

    // duration === 0 为手动控制模式
    if (this.options.duration > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.timer = setTimeout(() => {
        this.clear();
      }, this.options.duration);
    }
  }

  // 动态处理
  notify = (options: ToastParam) => {
    this.pipe({ ...parseOptions(options), visible: true });
  };

  clear = () => {
    // 关闭在前，重置在后
    this.queue.forEach((callback) => {
      callback({ ...this.options, visible: false });
    });
    // 重置内部参数，默认参数 visible: false
    this.options = { ...DefaultNotifyOptions };
  };

  subscribe(callback: Subscriber) {
    this.queue.push(callback);

    // 释放订阅
    return () => this.queue.splice(this.queue.indexOf(callback), 1);
  }
}

export const Notify = new NotifyManager(DefaultNotifyOptions);

// 目前仅支持单个 toast
export const NotifyProvider: FunctionComponent = () => {
  const [options, setOptions] = useState<NotifyOptions>(Notify.options);
  const {
    type,
    message,
    zIndex,
    duration,
    visible,
    color,
    top,
    background,
    safeAreaInsetTop,
  } = options;

  useEffect(() => {
    const unsubscribe = Notify.subscribe((_options) => {
      setOptions(_options);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NotifyBox
      type={type}
      message={message}
      duration={duration}
      color={color}
      top={top}
      background={background}
      safeAreaInsetTop={safeAreaInsetTop}
      zIndex={zIndex}
      visible={visible}
    />
  );
};
