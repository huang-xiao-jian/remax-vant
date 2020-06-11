// packages
import React, { FunctionComponent, useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Icon from '../Icon';
import uuid from '../tools/uuid';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import { Select } from '../tools/Switch';
import './Rate.css';

// 默认值填充属性
interface NeutralRateProps {
  count: number;
  size: string;
  gutter: string;
  color: string;
  voidColor: string;
  icon: string;
  voidIcon: string;
  allowHalf: boolean;
  readonly: boolean;
  disabled: boolean;
  disabledColor: string;
  touchable: boolean;
}

interface ExogenousRateProps {
  // 受控组件处理
  value: number;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件回调
  onChange?: (score: number) => void;
}

type RateProps = NeutralRateProps & ExogenousRateProps;

const DefaultRateProps: NeutralRateProps = {
  count: 5,
  size: '20px',
  gutter: '4px',
  color: '#ffd21e',
  voidColor: '#c7c7c7',
  icon: 'star',
  voidIcon: 'star-o',
  allowHalf: false,
  readonly: false,
  disabled: false,
  disabledColor: '#bdbdbd',
  touchable: true,
};

const Rate: FunctionComponent<RateProps> = (props) => {
  const {
    className,
    count,
    gutter,
    value,
    icon,
    voidIcon,
    size,
    disabledColor,
    disabled,
    color,
    voidColor,
    readonly,
    allowHalf,
    onChange,
  } = props;
  const classnames = {
    container: clsx(className, 'van-rate'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    iconWrap: {
      fontSize: size,
    },
  };
  // ID 限制范围，便捷查询，跳过匹配结果过滤
  const id = useMemo(() => uuid(), []);
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        // 序号 +1 转换为自然序
        score: index + 1,
        style: pickStyle({
          paddingRight: index === count - 1 ? '' : gutter,
        }),
      })),
    [count, gutter]
  );

  // icon 属性计算，不在 element 内部纠缠
  const tellMeName = (score: number, half = false) =>
    (half ? score - 0.5 : score) <= value ? icon : voidIcon;
  const tellMeColor = (score: number, half = false) =>
    // eslint-disable-next-line no-nested-ternary
    disabled
      ? disabledColor
      : (half ? score - 0.5 : score) <= value
      ? color
      : voidColor;

  // 事件回调
  const onSelect = (event: any) => {
    if (!disabled && !readonly) {
      if (typeof onChange === 'function') {
        onChange(event.currentTarget.dataset.score as number);
      }
    }
  };

  const onTouchMove = (event: any) => {
    const clientX = event.touches[0].clientX as number;

    wx.createSelectorQuery()
      .selectAll(`#${id} .van-rate__icon`)
      .boundingClientRect()
      .exec(
        ([rects]: [WechatMiniprogram.BoundingClientRectCallbackResult[]]) => {
          // 半星覆盖策略略有复杂，需要保障半星有限匹配
          const currentTarget = rects
            .sort((prev, current) => prev.right - current.right)
            .find((rect) => clientX >= rect.left && clientX <= rect.right);

          // rect 结果包含 dataset，因而此处可以临时替代
          if (currentTarget) {
            onSelect({
              currentTarget,
            });
          }
        }
      );
  };

  return (
    <View id={id} className={classnames.container} onTouchMove={onTouchMove}>
      {stars.map((star) => (
        <View className="van-rate__item" key={star.score} style={star.style}>
          <View
            data-score={star.score}
            className="van-rate__icon"
            style={stylesheets.iconWrap}
            onClick={onSelect}
          >
            <Icon
              name={tellMeName(star.score)}
              color={tellMeColor(star.score)}
            />
          </View>
          {/* half 与 full 共存，未严格匹配时与底层 icon 重叠，保持未选中状态，hack */}
          <Select in={allowHalf}>
            <View
              data-score={star.score - 0.5}
              className="van-rate__icon van-rate__icon--half"
              style={stylesheets.iconWrap}
              onClick={onSelect}
            >
              <Icon
                name={tellMeName(star.score, true)}
                color={tellMeColor(star.score, true)}
              />
            </View>
          </Select>
        </View>
      ))}
    </View>
  );
};

export default withDefaultProps<ExogenousRateProps, NeutralRateProps>(
  DefaultRateProps
)(Rate);
