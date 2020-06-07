// packages
import React, {
  FunctionComponent,
  CSSProperties,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import widthDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './Grid.css';

// 默认值填充属性
interface NeutralGridProps {
  columnNum: number;
  gutter: string;
  // 默认为 vertical，此处仅为占位使用
  direction?: 'horizontal';
  border: boolean;
  center: boolean;
  square: boolean;
  clickable: boolean;
}

interface ExogenousGridProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

export type GridProps = NeutralGridProps & ExogenousGridProps;

// scope
const DefaultGridProps: NeutralGridProps = {
  columnNum: 4,
  gutter: '0px',
  border: true,
  center: true,
  square: false,
  clickable: false,
};

const Grid: FunctionComponent<GridProps> = (props) => {
  const { className, children: rawChildren, ...rest } = props;
  const { border, gutter } = rest;
  const classnames = {
    container: clsx(className, 'van-grid', {
      'van-hairline--top': border && !gutter,
    }),
  };
  const style: CSSProperties = pickStyle({
    paddingLeft: gutter,
  });

  // attach index property to grid item child
  // transport share property to grid item child
  const children = Children.map(rawChildren, (child, index) =>
    isValidElement(child)
      ? cloneElement(child, {
          index,
          ...rest,
        })
      : child
  );

  return (
    <View style={style} className={classnames.container}>
      {children}
    </View>
  );
};

export default widthDefaultProps<ExogenousGridProps, NeutralGridProps>(
  DefaultGridProps
)(Grid);
