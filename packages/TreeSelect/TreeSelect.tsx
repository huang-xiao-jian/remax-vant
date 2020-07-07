// packages
import React, { FunctionComponent, CSSProperties } from 'react';
import clsx from 'clsx';
import { View, ScrollView } from 'remax/wechat';
// internal
import Sidebar from '../Sidebar';
import SidebarItem from '../SidebarItem';
import Icon from '../Icon';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import './TreeSelect.css';

interface TreeSelectChild {
  // identify, just use number now
  id: number;
  text: string;
  disabled?: boolean;
}

interface TreeSelectItem {
  text: string;
  disabled?: boolean;
  children: TreeSelectChild[];
}

// 默认值填充属性
interface NeutralTreeSelectProps {
  mainActiveIndex: number;
  activeId: number | number[];
  height: string;
}

interface ExogenousTreeSelectProps {
  items: TreeSelectItem[];
  // 容器类名，用以覆盖内部
  className?: string;
  onClickNav: (index: number) => void;
  onClickItem: (index: number) => void;
}

type TreeSelectProps = NeutralTreeSelectProps & ExogenousTreeSelectProps;

const DefaultTreeSelectProps: NeutralTreeSelectProps = {
  mainActiveIndex: 0,
  activeId: 0,
  height: '300px',
};

// Changes:
//   1. drop `max` property, transfer control to users;
const TreeSelect: FunctionComponent<TreeSelectProps> = (props) => {
  const {
    className,
    height,
    items,
    mainActiveIndex,
    activeId,
    onClickNav,
    onClickItem,
  } = props;
  const classnames = {
    container: clsx(className, 'van-tree-select'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    container: {
      height,
    },
  };
  // logical
  const { children = [] } = items[mainActiveIndex] || {};

  // 事件回调
  const onClickNavWrap = (index: number) => {
    const nav = items[index];

    if (!nav.disabled) {
      onClickNav(index);
    }
  };

  const onClickItemWrap = (item: TreeSelectChild) => {
    if (!item.disabled) {
      onClickItem(item.id);
    }
  };

  return (
    <View style={stylesheets.container} className={classnames.container}>
      <ScrollView scrollY className="van-tree-select__nav">
        <Sidebar
          className="van-tree-select__nav__inner"
          activeKey={mainActiveIndex}
          onChange={onClickNavWrap}
        >
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SidebarItem key={index} disabled={item.disabled}>
              {item.text}
            </SidebarItem>
          ))}
        </Sidebar>
      </ScrollView>

      <ScrollView scrollX className="van-tree-select__content">
        {children.map((child) => {
          const active = Array.isArray(activeId)
            ? activeId.includes(child.id)
            : activeId === child.id;

          const classNameItem = clsx('van-ellipsis', 'van-tree-select__item', {
            'van-tree-select__item--active': active,
            'van-tree-select__item--disable': child.disabled,
          });

          return (
            <View
              key={child.id}
              className={classNameItem}
              onClick={() => onClickItemWrap(child)}
            >
              {child.text}
              <Select in={active}>
                <Icon
                  name="checked"
                  size="16px"
                  className="van-tree-select__selected"
                />
              </Select>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default withDefaultProps<
  ExogenousTreeSelectProps,
  NeutralTreeSelectProps
>(DefaultTreeSelectProps)(TreeSelect);
