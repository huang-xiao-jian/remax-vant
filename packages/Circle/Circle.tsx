// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import clsx from 'clsx';
import { useNativeEffect } from 'remax';
import { View, Canvas, CoverView } from 'remax/wechat';
// internal
import uuid from '../tools/uuid';
import Deferred from '../tools/Deferred';
import { Switch, Case } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import { calcStrokeStyle, format, calcAngleRange } from './actions';
import './Circle.css';

// 默认值填充属性
interface NeutralCircleProps {
  size: number;
  color: string | Record<string, string>;
  layerColor: string;
  speed: number;
  strokeWidth: number;
  clockwise: boolean;
}

interface ExogenousCircleProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 必须属性
  value: number;
  // 填充色
  fill?: string;
  // 文本
  text: string;
}

type CircleProps = NeutralCircleProps & ExogenousCircleProps;

// scope
const DefaultCircleProps: NeutralCircleProps = {
  size: 100,
  color: '#1989fa',
  layerColor: '#fff',
  speed: 50,
  strokeWidth: 4,
  clockwise: true,
};

const Circle: FunctionComponent<CircleProps> = (props) => {
  const {
    className,
    size,
    color,
    text,
    children,
    clockwise,
    layerColor,
    speed,
    fill,
    strokeWidth,
    value: _value, // 限制范围
  } = props;
  const id = useMemo(() => uuid(), []);
  // limit range 0 ~ 100
  const value = format(_value);
  const classnames = {
    container: clsx(className, 'van-circle'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    canvas: {
      width: `${size}px`,
      height: `${size}px`,
    },
  };

  const $context$ = useRef(Deferred<CanvasRenderingContext2D>());
  const $point$ = useRef(0);
  const $pristine$ = useRef(true);
  const draw = (
    context: CanvasRenderingContext2D,
    strokeStyle: string | CanvasGradient,
    beginAngle: number,
    endAngle: number
  ): void => {
    const position = size / 2;
    const radius = position - strokeWidth / 2;

    // context.setStrokeStyle(strokeStyle);
    context.strokeStyle = strokeStyle;
    // context.setLineWidth(strokeWidth);
    context.lineWidth = strokeWidth;
    // context.setLineCap(lineCap);
    context.lineCap = 'round';

    context.beginPath();
    context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
    context.stroke();

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
  };

  const paint = (point: number) => {
    $context$.current.promise.then((context) => {
      // 清理现场
      context.clearRect(0, 0, size, size);

      // render layer circle
      draw(context, layerColor, 0, 2 * Math.PI);

      // render holver circle
      const [beginAngle, endAngle] = calcAngleRange(point, clockwise);
      const strokeStyle = calcStrokeStyle(context, color, size);

      draw(context, strokeStyle, beginAngle, endAngle);
    });
  };

  // resolve canvas context only once
  useNativeEffect(() => {
    const { pixelRatio: dpr } = wx.getSystemInfoSync();

    wx.createSelectorQuery()
      .select(`#${id}`)
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        // pre-setup
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        context.scale(dpr, dpr);

        // callback ctx
        $context$.current.resolve(context);
      });
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  // 初次绘制无动效
  useEffect(() => {
    paint(value);

    // 状态标记
    $pristine$.current = false;
    // 内敛值更新
    $point$.current = value;
  }, []);

  // 后续绘制处理动效
  // 仅支持 value 响应，其他属性变更不支持
  useEffect(() => {
    const interval = setInterval(() => {
      if (value !== $point$.current) {
        const { current } = $point$;
        const next = current < value ? current + 1 : current - 1;
        // 更新内部 step
        $point$.current = next;

        paint(next);
      } else {
        clearInterval(interval);
      }
    }, 1000 / speed);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <View className={classnames.container}>
      <Canvas type="2d" id={id} style={stylesheets.canvas} />
      <Switch>
        <Case in={!text}>
          <View className="van-circle__text">{children}</View>
        </Case>
        <Case default>
          <CoverView className="van-circle__text">{text}</CoverView>
        </Case>
      </Switch>
    </View>
  );
};

export default withDefaultProps<ExogenousCircleProps, NeutralCircleProps>(
  DefaultCircleProps
)(Circle);
