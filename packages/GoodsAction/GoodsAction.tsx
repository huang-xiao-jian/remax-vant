// packages
import React, {
  FunctionComponent,
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import GoodsActionButton from '../GoodsActionButton';
import withDefaultProps from '../tools/with-default-props-advance';
import './GoodsAction.css';

// 默认值填充属性
interface NeutralGoodsActionProps {
  safeAreaInsetBottom: boolean;
}

interface ExogenousGoodsActionProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

type GoodsActionProps = NeutralGoodsActionProps & ExogenousGoodsActionProps;

// scope
const DefaultGoodsActionProps: NeutralGoodsActionProps = {
  safeAreaInsetBottom: true,
};

const GoodsAction: FunctionComponent<GoodsActionProps> = (props) => {
  const { className, safeAreaInsetBottom, children: rawChildren } = props;
  const classnames = {
    container: clsx(className, 'van-goods-action', {
      'van-goods-action--safe': safeAreaInsetBottom,
    }),
  };

  // only target GoodsActionButton
  const isGoodsActionButton = (element: ReactNode) =>
    isValidElement(element) && element.type === GoodsActionButton;
  // 统计 GoodsActionButton 数量
  const availableGoodsActionButton: ReactElement[] = [];

  // extract GoodsActionButton
  Children.forEach(rawChildren, (child) => {
    if (isGoodsActionButton(child)) {
      availableGoodsActionButton.push(child as ReactElement);
    }
  });

  // mapping children
  const children = Children.map(rawChildren, (child) => {
    if (isGoodsActionButton(child)) {
      const index = availableGoodsActionButton.indexOf(child as ReactElement);
      // never mind the nested ternary
      // prettier-ignore
      const mark =
        // eslint-disable-next-line no-nested-ternary
        index === 0
          ? 'first'
          : (index === availableGoodsActionButton.length - 1 ? 'last' : 'middle');

      return cloneElement(child as ReactElement, { mark });
    }

    return child;
  });

  return <View className={classnames.container}>{children}</View>;
};

export default withDefaultProps<
  ExogenousGoodsActionProps,
  NeutralGoodsActionProps
>(DefaultGoodsActionProps)(GoodsAction);
