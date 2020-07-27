// packages
import React, {
  FunctionComponent,
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
import {
  ExogenousCellProps,
  NeutralCellProps,
  CellProps,
} from './Cell.interface';
import './Cell.css';

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
    children,
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

      {/* core */}
      <View className="van-cell__value">{value || children}</View>

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
        <Case in={typeof rightIcon === 'string'}>
          <View className="van-cell__right-icon-wrap">
            <Icon className="van-cell__right-icon" name={rightIcon as string} />
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
