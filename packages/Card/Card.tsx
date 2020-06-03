// packages
import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { View, Text } from 'remax/wechat';
// internal
import Tag from '../Tag';
import { Select, Switch, Case } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './Card.css';

// 默认值填充属性
interface NeutralCardProps {
  centered: boolean;
  currency: string;
}

interface ExogenousCardProps {
  // 容器类名，用以覆盖内部
  className?: string;
  title?: string;
  desc?: string;
  // 原组件 tag 属性，与 tags 语义接近
  label?: string;
  num?: string | number;
  originPrice?: string | number;
  // substitute original complex thumb, thumb-mode,thumb-link, lazy-load
  price?: ReactNode;
  thumb?: ReactNode;
  footer?: ReactNode;
  tags?: ReactNode;
}

type CardProps = NeutralCardProps & ExogenousCardProps;

const DefaultCardProps: NeutralCardProps = {
  centered: false,
  currency: '¥',
};

const splitPrice = (price: ReactNode) => {
  if (typeof price === 'string' || typeof price === 'number') {
    const [integer, decimal] = price.toString().split('.');

    return {
      integer,
      decimal: decimal ? `.${decimal}` : '',
    };
  }

  return {};
};

// Chagnes:
// 1. drop support for price-top slot;
// 2. drop support for bottom slot;
// 3. remove originPrice === 0 condition, are you kidding???
const Card: FunctionComponent<CardProps> = (props) => {
  const {
    className,
    centered,
    label,
    title,
    desc,
    thumb,
    footer,
    tags,
    price,
    num,
    currency,
    originPrice,
  } = props;
  const classnames = {
    container: clsx(className, 'van-card'),
    header: clsx('van-card__header', {
      'van-card__header--center': centered,
    }),
    content: clsx('van-card__content', {
      'van-card__content--center': centered,
    }),
  };
  const priceSplit = splitPrice(price);

  return (
    <View className={classnames.container}>
      <View className={classnames.header}>
        <View className="van-card__thumb">
          <Select in={!!thumb}>{thumb}</Select>
          <Select in={!!label}>
            <Tag mask type="danger" className="van-card__tag">
              {label}
            </Tag>
          </Select>
        </View>
        <View className={classnames.content}>
          <View>
            <Select in={!!title}>
              <View className="van-card__title">{title}</View>
            </Select>
            <Select in={!!desc}>
              <View className="van-card__desc">{desc}</View>
            </Select>
            <Select in={!!tags}>{tags}</Select>
          </View>
          <View className="van-card__bottom">
            {/* price block */}
            <Switch>
              <Case in={typeof price === 'string' || typeof price === 'string'}>
                <View className="van-card__price">
                  <Text>{currency}</Text>
                  <Text className="van-card__price-integer">
                    {priceSplit.integer}
                  </Text>
                  <Text className="van-card__price-decimal">
                    {priceSplit.decimal}
                  </Text>
                </View>
              </Case>
              <Case default>{price}</Case>
            </Switch>
            {/* origin price block */}
            <Select in={!!originPrice}>
              <View className="van-card__origin-price">
                {`${currency} ${originPrice}`}
              </View>
            </Select>
            {/* num block */}
            <Switch>
              <Case in={typeof num === 'string' || typeof num === 'number'}>
                <View className="van-card__num">{`x ${num}`}</View>
              </Case>
              <Case default>{num}</Case>
            </Switch>
          </View>
        </View>
      </View>

      <View className="van-card__footer">{footer}</View>
    </View>
  );
};

export default withDefaultProps<ExogenousCardProps, NeutralCardProps>(
  DefaultCardProps
)(Card);
