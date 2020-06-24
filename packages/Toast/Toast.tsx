/* eslint-disable import/prefer-default-export */
// packages
import React, {
  FunctionComponent,
  useState,
  CSSProperties,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Overlay from '../Overlay';
import Loading from '../Loading';
import Transition from '../Transition';
import Icon from '../Icon';
import { Select, Switch, Case } from '../tools/Switch';
import pickStyle from '../tools/pick-style';
import './Toast.css';

export type ToastType = 'loading' | 'success' | 'fail' | 'text';
export interface ToastOptions {
  type: ToastType;
  position: 'top' | 'middle' | 'bottom';
  message: string;
  mask: boolean;
  forbidClick: boolean;
  loadingType: 'circular' | 'spinner';
  zIndex: number;
  duration: number;
  visible: boolean;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onClose?: () => void;
}

// scope
const ToastBox: FunctionComponent<ToastOptions> = (props) => {
  const {
    mask,
    visible,
    forbidClick,
    type,
    position,
    loadingType,
    zIndex,
    message,
    className,
    children,
  } = props;

  // 样式派生
  const stylesheets: Record<string, CSSProperties> = {
    mask: pickStyle({
      backgroundColor: mask ? '' : 'transparent',
    }),
    transition: {
      zIndex,
    },
  };
  const classnames = {
    container: clsx(className, 'van-toast__container'),
    toast: clsx(className, 'van-toast', `van-toast--${position}`, {
      'van-toast--text': type === 'text',
      'van-toast--icon': type !== 'text',
    }),
  };

  return (
    <>
      <Select in={mask || forbidClick}>
        <Overlay visible={visible} zIndex={zIndex} style={stylesheets.mask} />
      </Select>
      <Transition
        visible={visible}
        style={stylesheets.transition}
        className={classnames.container}
      >
        <View className={classnames.toast}>
          <Switch>
            <Case in={type === 'text'}>
              <Text>{message}</Text>
            </Case>
            <Case in={type === 'loading'}>
              <Loading
                color="#fff"
                type={loadingType}
                className="van-toast__loading"
              />
              <Select in={!!message}>
                <Text className="van-toast__text">{message}</Text>
              </Select>
            </Case>
            <Case default>
              <Icon name={type} className="van-toast__icon" />
              <Select in={!!message}>
                <Text className="van-toast__text">{message}</Text>
              </Select>
            </Case>
          </Switch>
          {children}
        </View>
      </Transition>
    </>
  );
};

type ToastParam = string | Partial<ToastOptions>;
type Subscriber = (options: ToastOptions) => void;

const parseOptions: (options: ToastParam) => Partial<ToastOptions> = (
  options
) => {
  return typeof options === 'string' ? { message: options } : options;
};

const DefautlToastOptions: ToastOptions = {
  type: 'text',
  position: 'middle',
  message: '',
  mask: false,
  forbidClick: false,
  loadingType: 'circular',
  zIndex: 1000,
  duration: 2000,
  visible: false,
};

// 目前仅支持单个 toast
class ToastManager {
  public options: ToastOptions;

  private queue: Subscriber[];

  private timer: number | null;

  constructor(options: ToastOptions) {
    this.options = options;
    this.queue = [];
    this.timer = null;
  }

  private pipe(options: Partial<ToastOptions>) {
    if (this.queue.length === 0) {
      throw new Error('ToastProvider required');
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

  // 预设选项管理
  setDefaultOptions(options: Partial<ToastOptions>) {
    this.options = { ...this.options, ...options };
  }

  resetDefaultOptions() {
    this.options = { ...DefautlToastOptions };
  }

  // 动态处理
  info(options: ToastParam) {
    this.pipe({ ...parseOptions(options), type: 'te', visible: true });
  }

  loading(options: ToastParam) {
    this.pipe({ ...parseOptions(options), type: 'loading', visible: true });
  }

  success(options: ToastParam) {
    this.pipe({ ...parseOptions(options), type: 'success', visible: true });
  }

  fail(options: ToastParam) {
    this.pipe({ ...parseOptions(options), type: 'fail', visible: true });
  }

  clear() {
    // 重置内部参数
    this.options = { ...DefautlToastOptions };
    this.queue.forEach((callback) => {
      callback(this.options);
    });
  }

  subscribe(callback: Subscriber) {
    this.queue.push(callback);

    // 释放订阅
    return () => this.queue.splice(this.queue.indexOf(callback), 1);
  }
}

export const Toast = new ToastManager(DefautlToastOptions);

// 目前仅支持单个 toast
export const ToastProvider: FunctionComponent = () => {
  const [options, setOptions] = useState<ToastOptions>(Toast.options);
  const {
    type,
    position,
    message,
    mask,
    forbidClick,
    loadingType,
    zIndex,
    duration,
    visible,
    onClose,
  } = options;

  useEffect(() => {
    const unsubscribe = Toast.subscribe((_options) => {
      setOptions(_options);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ToastBox
      type={type}
      position={position}
      message={message}
      mask={mask}
      forbidClick={forbidClick}
      loadingType={loadingType}
      zIndex={zIndex}
      duration={duration}
      visible={visible}
      onClose={onClose}
    />
  );
};
