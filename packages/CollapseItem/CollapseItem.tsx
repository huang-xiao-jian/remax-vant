// packages
import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Cell from '../Cell';
import { CollapseContext } from '../Collapse/Collapse.constant';
import withDefaultProps from '../tools/with-default-props-advance';
import uuid from '../tools/uuid';
import './CollapseItem.css';

// 默认值填充属性
interface NeutralCollapseItemProps {
  border: boolean;
  isLink: boolean;
  clickable: boolean;
  disabled: boolean;
}

interface ExogenousCollapseItemProps {
  // 唯一标识
  name: string;
  index?: number;
  // 透传 Cell 组件
  title?: string | ReactNode;
  icon?: string | ReactNode;
  label?: string | ReactNode;
  value?: ReactNode;
  // 容器类名，用以覆盖内部
  className?: string;
}

type CollapseItemProps = NeutralCollapseItemProps & ExogenousCollapseItemProps;

// scope
const DefaultCollapseItem: NeutralCollapseItemProps = {
  border: true,
  isLink: true,
  clickable: false,
  disabled: false,
};

const CollapseItem: FunctionComponent<CollapseItemProps> = (props) => {
  const {
    className,
    index,
    title,
    icon,
    label,
    isLink,
    clickable,
    border,
    name,
    disabled,
    children,
    value: _value,
  } = props;
  const { value, dispatch } = useContext(CollapseContext);
  // van-collapse-item__content 配套 ID，便于查询
  const id = useMemo(() => uuid(), []);
  // 收放转场
  const [style, setStyle] = useState<{ height: string }>({
    // 初始值界定为 0px，避免画面闪烁
    height: '0px',
  });

  // 派生数据
  const expanded = Array.isArray(value) ? value.includes(name) : value === name;
  const classnames = {
    container: clsx(className, 'van-collapse-item', {
      'van-hairline--top': index,
    }),
    cell: clsx('van-collapse-item__title', {
      'van-collapse-item__title--disabled': disabled,
      'van-collapse-item__title--expanded': expanded,
    }),
    collapse: clsx(
      'van-collapse-item__wrapper',
      'van-collapse-item__wrapper--transition'
    ),
  };
  const onClick = () => dispatch(name);

  useEffect(() => {
    if (!expanded) {
      setStyle({
        height: '0px',
      });
    } else {
      wx.createSelectorQuery()
        .select(`#${id}`)
        .boundingClientRect()
        .exec(([boundingClientRect]) => {
          setStyle({
            height: boundingClientRect.height
              ? `${boundingClientRect.height}px`
              : 'auto',
          });
        });
    }
  }, [expanded, id]);

  return (
    <View className={classnames.container}>
      <View className={classnames.cell}>
        <Cell
          title={title}
          icon={icon}
          value={_value}
          label={label}
          isLink={isLink}
          clickable={clickable}
          border={border && expanded}
          className="van-cell"
          hoverClassName="van-cell--hover"
          onClick={onClick}
        />
      </View>
      <View className={classnames.collapse} style={style}>
        <View id={id} className="van-collapse-item__content">
          {children}
        </View>
      </View>
    </View>
  );
};

export default withDefaultProps<
  ExogenousCollapseItemProps,
  NeutralCollapseItemProps
>(DefaultCollapseItem)(CollapseItem);
