// packages
import React, { FunctionComponent, CSSProperties, ReactElement } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Select } from '../tools/Switch';
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
  // 自定义图标占位，自定义图标需要颜色适配，当前颜色由组件内部管理，所以推荐使用函数
  renderActiveCircle: (color: string) => ReactElement;
  renderInactiveCircel: (color: string) => ReactElement;
}

interface ExogenousStepsProps {
  // 步骤定义
  steps: StepItem[];
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClickStep?: (step: number) => void;
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
    const stylesheets: Record<string, CSSProperties> = {
      container: pickStyle({
        color: status === 'inactive' ? inactiveColor : undefined,
      }),
      title: pickStyle({
        color: status === 'process' ? activeColor : undefined,
      }),
      line: pickStyle({
        backgroundColor: status === 'finish' ? activeColor : inactiveColor,
      }),
    };
    const classNameStep = clsx(
      'van-step',
      'van-hairline',
      `van-step--${direction}`,
      `van-step--${status}`
    );
    const currentColor = status === 'inactive' ? inactiveColor : activeColor;
    // 非末尾填充线条
    const visibility = {
      line: index !== steps.length - 1,
    };
    // 事件绑定
    const onClick = () => {
      if (typeof onClickStep === 'function') {
        onClickStep(index);
      }
    };

    // 新增 van-step__title-text，van-step__title-desc 便于样式覆盖
    return (
      /* eslint-disable react/no-array-index-key */
      <View
        key={index}
        style={stylesheets.container}
        className={classNameStep}
        onClick={onClick}
      >
        <View className="van-step__title" style={pickStyle(stylesheets.title)}>
          <View className="van-step__title-text">{step.text}</View>
          <View className="van-step__title-desc">{step.desc}</View>
        </View>
        <View className="van-step__circle-container">
          {index === active
            ? renderActiveCircle(currentColor)
            : renderInactiveCircel(currentColor)}
        </View>
        <Select in={visibility.line}>
          <View style={stylesheets.line} className="van-step__line" />
        </Select>
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
