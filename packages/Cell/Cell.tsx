// packages
import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import withDefaultProps from '../tools/with-default-props-advance';
import addClass from '../tools/add-class';
import './Cell.css';

// 默认值填充属性
interface NeutralCellProps {
  // 移植属性
  required: boolean;
  border: boolean;
  clickable: boolean;
  isLink: boolean;
  center: boolean;
  size: 'default' | 'large';
}

interface ExogenousCellProps {
  title?: ReactNode;
  label?: ReactNode;
  value?: ReactNode;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  // 改造新增属性
  hoverClassName?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClick?: (event: any) => void;
}

type CellProps = NeutralCellProps & ExogenousCellProps;

// scope
const DefaultCellProps: NeutralCellProps = {
  required: false,
  border: true,
  clickable: false,
  center: false,
  isLink: false,
  size: 'default',
};

const Cell: FunctionComponent<CellProps> = (props) => {
  const {
    className,
    size,
    required,
    border,
    center,
    isLink,
    clickable,
    hoverClassName,
    title,
    label,
    value,
    icon,
    rightIcon,
  } = props;
  const { onClick } = props;
  const classnames = {
    container: clsx(className, 'van-cell', `van-cell--${size}`, {
      'van-cell--center': center,
      'van-cell--required': required,
      'van-cell--borderless': !border,
      'van-cell--clickable': isLink || clickable,
    }),
    hover: clsx('van-cell--hover', hoverClassName),
  };
  // add extra built-in classname
  // TODO - weired icon drift issue, add icon style line-height: 24px, but why?
  const clones = {
    icon: isValidElement(icon)
      ? cloneElement(icon, {
          className: addClass(icon.props.className, [
            'van-cell__left-icon-wrap',
            'van-cell__left-icon',
          ]),
        })
      : icon,
    rightIcon: isValidElement(rightIcon)
      ? cloneElement(rightIcon, {
          className: addClass(rightIcon.props.className, [
            'van-cell__right-icon-wrap',
            'van-cell__right-icon',
          ]),
        })
      : rightIcon,
  };

  return (
    <View
      className={classnames.container}
      hoverClassName={classnames.hover}
      hoverStayTime={70}
      onClick={onClick}
    >
      {clones.icon}
      <View className="van-cell__title">
        {title}
        <View className="van-cell__label">{label}</View>
      </View>
      <View className="van-cell__value">{value}</View>
      {clones.rightIcon}
    </View>
  );
};

export default withDefaultProps<ExogenousCellProps, NeutralCellProps>(
  DefaultCellProps
)(Cell);
