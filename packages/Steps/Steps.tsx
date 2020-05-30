// packages
import React, { FunctionComponent, CSSProperties, ReactElement } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './Steps.css';

interface StepItem {
  text: string;
  desc: string;
}

// 默认值填充属性
interface NeutralStepsProps {
  active: number;
  direction: 'horizontal' | 'vertical';
  activeColor: string;
  inactiveColor: string;
  // 自定义图标占位
  renderActiveCircle: (color: string) => ReactElement;
  renderInactiveCircel: (color: string) => ReactElement;
}

interface ExogenousStepsProps {
  // 步骤定义
  steps: StepItem[];
  onClickStep?: (event: { detail: number }) => void;
  // 容器类名，用以覆盖内部
  className?: string;
}

type StepsProps = NeutralStepsProps & ExogenousStepsProps;

const DefaultStepsProps: NeutralStepsProps = {
  active: 0,
  direction: 'horizontal',
  activeColor: '#07c160',
  inactiveColor: '#969799',
  // 默认渲染逻辑，平行移植 vant-weapp，.van-step__icon
  renderActiveCircle: (color) => (
    <Icon name="checked" className="van-step__icon" color={color} />
  ),
  renderInactiveCircel: (color) => (
    <View
      className="van-step__circle"
      style={{
        backgroundColor: color,
      }}
    />
  ),
};

const Steps: FunctionComponent<StepsProps> = (props) => {
  const {
    className,
    direction,
    steps,
    active,
    activeColor,
    inactiveColor,
  } = props;
  const classnames = {
    container: clsx(className, 'van-steps', `van-steps--${direction}`),
  };
  const children = steps.map((step, index) => {
    const { onClickStep, renderActiveCircle, renderInactiveCircel } = props;
    // 派生状态
    const status =
      // eslint-disable-next-line no-nested-ternary
      index < active ? 'finish' : index === active ? 'process' : 'inactive';
    const styles: Record<'container' | 'title' | 'line', CSSProperties> = {
      container: {
        color: status === 'inactive' ? inactiveColor : undefined,
      },
      title: {
        color: status === 'process' ? activeColor : undefined,
      },
      line: {
        backgroundColor: status === 'finish' ? activeColor : inactiveColor,
      },
    };
    const classNameStep = clsx(
      'van-step',
      'van-hairline',
      `van-step--${direction}`,
      `van-step--${status}`
    );
    // 新增 van-step__title-text，van-step__title-desc 便于样式覆盖
    const title = (
      <View className="van-step__title" style={pickStyle(styles.title)}>
        <View className="van-step__title-text">{step.text}</View>
        <View className="van-step__title-desc">{step.desc}</View>
      </View>
    );
    const currentColor = status === 'inactive' ? inactiveColor : activeColor;
    const circle = (
      <View className="van-step__circle-container">
        {index === active
          ? renderActiveCircle(currentColor)
          : renderInactiveCircel(currentColor)}
      </View>
    );
    // 非末尾填充线条
    const line = index !== steps.length - 1 && (
      <View style={pickStyle(styles.line)} className="van-step__line" />
    );
    // 事件绑定
    const onClick = () => {
      if (typeof onClickStep === 'function') {
        onClickStep({ detail: index });
      }
    };

    return (
      /* eslint-disable react/no-array-index-key */
      <View
        key={index}
        style={pickStyle(styles.container)}
        className={classNameStep}
        onClick={onClick}
      >
        {title}
        {circle}
        {line}
      </View>
    );
  });

  return (
    <View className={classnames.container}>
      <View className="van-step__wrapper">{children}</View>
    </View>
  );
};

export default withDefaultProps<ExogenousStepsProps, NeutralStepsProps>(
  DefaultStepsProps
)(Steps);
