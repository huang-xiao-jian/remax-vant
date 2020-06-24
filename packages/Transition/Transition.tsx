// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useEffect,
  useReducer,
} from 'react';
import { useNativeEffect } from 'remax';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import { transitionReducer, TransitionActionType } from './Transition.redux';
import './Transition.css';

// 默认值填充属性
interface NeutralTransitionProps {
  // 转场开关
  visible: boolean;
  // 预设动画
  name: string;
  // 转场时间
  duration: number | string;
}

interface ExogenousTransitionProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 样式扩展
  style?: CSSProperties;
  // 事件绑定
  onClick?: () => void;
}

type TransitionProps = NeutralTransitionProps & ExogenousTransitionProps;

// scope
const DefaultTransitionProps: NeutralTransitionProps = {
  name: 'van-fade',
  visible: false,
  duration: 300,
};

// TODO - appear transition not supported
const Transition: FunctionComponent<TransitionProps> = (props) => {
  const {
    className,
    visible,
    duration,
    name,
    // 预设空对象，避免后续空对象判定
    style = {},
    children,
    onClick,
  } = props;
  const [state, dispatch] = useReducer(transitionReducer, {
    name,
    duration,
    className,
    appeared: false,
    // 初次渲染处理
    style: pickStyle({
      display: visible ? '' : 'none',
    }),
  });
  // 支持自定义 style 样式, className
  const bindings = {
    style: {
      ...style,
      ...state.style,
      display:
        // 非标准操作，子元素显示状态时优先使用传递的 display 值
        style.display && state.style.display !== 'none'
          ? style.display
          : state.style.display,
    },
    className: className ? `${state.className} ${className}` : state.className,
  };

  // TODO - 事件触发不稳定，后续处理
  const onTransitionEnd = () => {
    dispatch({
      type: visible ? TransitionActionType.Entered : TransitionActionType.Left,
    });
  };

  // 首次渲染不执行转场逻辑
  useEffect(() => {
    dispatch({
      type: TransitionActionType.Appeared,
    });
  }, []);

  // 处理预设动画名改变
  useEffect(() => {
    dispatch({
      type: TransitionActionType.Mutation,
      payload: {
        name,
        duration,
      },
    });
  }, [name, duration]);

  // double effect 时间差，天然处理渲染时机
  useEffect(() => {
    dispatch({
      type: visible ? TransitionActionType.Enter : TransitionActionType.Leave,
    });
  }, [visible]);

  useNativeEffect(() => {
    // 延迟帧，see https://github.com/youzan/vant-weapp/blob/d35649e88f64555d9aece4e2ca0151a73d2c5ddf/packages/mixins/transition.ts#L10
    const id = setTimeout(() => {
      dispatch({
        type: visible
          ? TransitionActionType.Entering
          : TransitionActionType.Leaving,
      });
    }, 1000 / 30);

    return () => clearTimeout(id);
  }, [visible]);

  return (
    <View
      style={bindings.style}
      className={bindings.className}
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </View>
  );
};

export default withDefaultProps<
  ExogenousTransitionProps,
  NeutralTransitionProps
>(DefaultTransitionProps)(Transition);
