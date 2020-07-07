// packages
import React, {
  FunctionComponent,
  useReducer,
  useMemo,
  CSSProperties,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import uuid from '../tools/uuid';
import pickStyle from '../tools/pick-style';
import withDefaultProps from '../tools/with-default-props-advance';

import { DropdownMenuUnitEvent } from './DropdownMenu.constant';
import {
  dropdownMenuReducer,
  DropdownMenuReducer,
  DropdownActionTypes,
} from './DropdownMenu.redux';
import {
  DropdownMenuContext,
  DropdownMenuContextPayload,
} from './DropdownMenu.context';
import './DropdownMenu.css';

// 默认值填充属性
interface NeutralDropdownMenuProps {
  activeColor: string; // Menu，MenuItem 共享
  overlay: boolean; // MenuItem 专用
  zIndex: number; // MenuItem 专用，初始化绑定
  duration: number; // MenuItem 专用
  direction: 'up' | 'down'; // Menu，MenuItem 共享
}

interface ExogenousDropdownMenuProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

type DropdownMenuProps = NeutralDropdownMenuProps & ExogenousDropdownMenuProps;

// scope
const DefaultDropdownMenuProps: NeutralDropdownMenuProps = {
  activeColor: '#1989fa',
  overlay: true,
  zIndex: 10,
  duration: 200,
  direction: 'down',
};

const DropdownMenu: FunctionComponent<DropdownMenuProps> = (props) => {
  const {
    activeColor,
    overlay,
    zIndex,
    duration,
    direction,
    className,
    children,
  } = props;
  const classnames = {
    container: clsx(
      className,
      'van-dropdown-menu',
      'van-dropdown-menu--top-bottom'
    ),
  };
  // ID 选择器
  const id = useMemo(() => uuid(), []);
  // 当前选择 title
  const [state, dispatch] = useReducer<DropdownMenuReducer>(
    dropdownMenuReducer,
    {
      activeCategory: '',
      units: [],
    }
  );

  const onItemClick = (event: DropdownMenuUnitEvent) => {
    if (!event.currentTarget.dataset.disabled) {
      dispatch({
        type: DropdownActionTypes.SwitchCategory,
        payload: {
          category: event.currentTarget.dataset.category,
        },
      });
    }
  };

  const payload: DropdownMenuContextPayload = {
    // 属性传递
    activeColor,
    overlay,
    zIndex,
    duration,
    direction,
    // 内部状态管理
    id,
    dispatch,
    activeCategory: state.activeCategory,
  };

  return (
    <DropdownMenuContext.Provider value={payload}>
      <View id={id} className={classnames.container}>
        {state.units.map((unit) => {
          const { activeCategory } = state;
          const { category, disabled } = unit;
          const styleForTitle = {
            '--dropdown-menu-title-active-text-color': activeColor,
          };
          const classNameForItem = clsx('van-dropdown-menu__item', {
            'van-dropdown-menu__item--disabled': disabled,
          });
          const classNameForTitle = clsx('van-dropdown-menu__title', {
            'van-dropdown-menu__title--active': category === activeCategory,
            'van-dropdown-menu__title--down':
              (category === activeCategory && direction === 'down') ||
              (category !== activeCategory && direction === 'up'),
          });

          return (
            <View
              data-category={category}
              data-disabled={disabled}
              key={category}
              className={classNameForItem}
              onClick={onItemClick}
            >
              <View
                style={styleForTitle as CSSProperties}
                className={classNameForTitle}
              >
                <View className="van-ellipsis">{unit.text || category}</View>
              </View>
            </View>
          );
        })}
        {children}
      </View>
    </DropdownMenuContext.Provider>
  );
};

export default withDefaultProps<
  ExogenousDropdownMenuProps,
  NeutralDropdownMenuProps
>(DefaultDropdownMenuProps)(DropdownMenu);
