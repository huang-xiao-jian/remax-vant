// packages
import React, {
  FunctionComponent,
  ReactNode,
  CSSProperties,
  ReactElement,
  isValidElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import { Select, Switch, Case } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './Cell.css';

// 默认值填充属性
interface NeutralCellProps {
  required: boolean;
  border: boolean;
  clickable: boolean;
  isLink: boolean;
  center: boolean;
  size: 'default' | 'large';
  linkType: 'redirectTo' | 'switchTab' | 'reLaunch' | 'navigateTo';
}

interface ExogenousCellProps {
  titleWidth?: string;
  // the same name slot
  title?: string | ReactElement;
  icon?: string | ReactElement;
  label?: string | ReactElement;
  value?: ReactNode;
  rightIcon?: ReactElement;
  url?: string;
  style?: CSSProperties;
  arrowDirection?: 'left' | 'up' | 'down';
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
  linkType: 'navigateTo',
};

const Cell: FunctionComponent<CellProps> = (props) => {
  const {
    className,
    size,
    required,
    border,
    center,
    isLink,
    linkType,
    url,
    clickable,
    hoverClassName,
    title,
    titleWidth,
    label,
    value,
    icon,
    style,
    rightIcon,
    arrowDirection,
  } = props;
  const { onClick } = props;
  const classnames = {
    container: clsx(className, 'van-cell', `van-cell--${size}`, {
      'van-cell--center': center,
      'van-cell--required': required,
      'van-cell--borderless': !border,
      'van-cell--clickable': isLink || clickable,
    }),
    hover: clsx(hoverClassName, 'van-cell--hover'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    title: pickStyle({
      maxWidth: titleWidth,
      minWidth: titleWidth,
    }),
  };

  const onClickWrap = (event: unknown) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    if (typeof url === 'string') {
      switch (linkType) {
        case 'navigateTo':
          wx.navigateTo({ url });
          break;
        case 'redirectTo':
          wx.redirectTo({ url });
          break;
        case 'switchTab':
          wx.switchTab({ url });
          break;
        case 'reLaunch':
          wx.reLaunch({ url });
          break;
        default:
          // eslint-disable-next-line no-console
          console.warn('invalid link type param');
      }
    }
  };

  return (
    <View
      style={style}
      className={classnames.container}
      hoverClassName={classnames.hover}
      hoverStayTime={70}
      onClick={onClickWrap}
    >
      {/* left icon */}
      <Switch>
        <Case in={typeof icon === 'string'}>
          <View className="van-cell__left-icon-wrap">
            <Icon name={icon as string} className="van-cell__left-icon" />
          </View>
        </Case>
        <Case in={isValidElement(icon)}>{icon as ReactElement}</Case>
      </Switch>

      {/* title */}
      <View className="van-cell__title" style={stylesheets.title}>
        {title}
        <Select in={!!label}>
          <View className="van-cell__label">{label}</View>
        </Select>
      </View>

      {/* value */}
      <Select in={!!value}>
        <View className="van-cell__value">{value}</View>
      </Select>

      {/* right */}
      <Switch>
        <Case in={isLink}>
          <View className="van-cell__right-icon-wrap">
            <Icon
              className="van-cell__right-icon"
              name={arrowDirection ? `arrow-${arrowDirection}` : 'arrow'}
            />
          </View>
        </Case>
        <Case in={isValidElement(rightIcon)}>{rightIcon}</Case>
      </Switch>
    </View>
  );
};

export default withDefaultProps<ExogenousCellProps, NeutralCellProps>(
  DefaultCellProps
)(Cell);
