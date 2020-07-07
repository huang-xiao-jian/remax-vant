// packages
import React, {
  FunctionComponent,
  useContext,
  CSSProperties,
  useEffect,
  useRef,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Popup from '../Popup';
import Cell from '../Cell';
import Icon from '../Icon';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import {
  DropdownItemOption,
  DropdownItemOptionEvent,
} from '../DropdownMenu/DropdownMenu.constant';
import { DropdownMenuContext } from '../DropdownMenu/DropdownMenu.context';
import { DropdownActionTypes } from '../DropdownMenu/DropdownMenu.redux';
import DropdownItemDimension from './DropdownItemDimension';
import './DropdownItem.css';

// 默认值填充属性
interface NeutralDropdownItemProps {
  disabled: boolean;
}

interface ExogenousDropdownItemProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // popup 样式，透传
  popupStyle?: CSSProperties;
  // 选项分类
  category: string;
  // 选项列表
  options: DropdownItemOption[];
  // 标准受控组件
  value: string;
  onChange: (value: string) => void;
}

type DropdownItemProps = NeutralDropdownItemProps & ExogenousDropdownItemProps;

// scope
const DefaultDropdownItemProps: NeutralDropdownItemProps = {
  disabled: false,
};

const DropdownItem: FunctionComponent<DropdownItemProps> = (props) => {
  const {
    direction,
    duration,
    overlay,
    activeCategory,
    activeColor,
    id,
    zIndex,
    dispatch,
  } = useContext(DropdownMenuContext);
  const {
    className,
    options,
    category,
    value,
    disabled,
    popupStyle = {},
    onChange,
  } = props;
  const stylesheets: Record<string, CSSProperties> = {
    dimensiton: {
      zIndex,
    },
    popup: {
      ...popupStyle,
      position: 'absolute',
    },
    overlay: {
      position: 'absolute',
    },
  };

  const visible = category === activeCategory;
  // dispatch 初始化后不会变化
  const $dispatch$ = useRef(dispatch);
  const $category$ = useRef(category);

  // 事件回调
  const onOptionClick = (event: DropdownItemOptionEvent) => {
    // 标准受控组件处理
    onChange(event.currentTarget.dataset.value);

    // 关闭 dropdown
    dispatch({
      type: DropdownActionTypes.SwitchCategory,
      payload: {
        category,
      },
    });
  };

  // 注册类目
  useEffect(() => {
    const { current: _dispatch } = $dispatch$;
    const { current: _category } = $category$;

    // 更新引用
    $category$.current = category;

    // 剔除 legacy category，特殊变更，排除初次变更
    if (_category !== category && _category !== '') {
      _dispatch({
        type: DropdownActionTypes.ExileCategory,
        payload: {
          category,
        },
      });
    }

    // 类目注册信息变更
    _dispatch({
      type: DropdownActionTypes.SettleCategory,
      payload: {
        category,
        disabled,
        text: options.find((option) => value === option.value)?.text,
      },
    });
  }, [category, disabled, value, options]);

  return (
    <DropdownItemDimension
      id={id}
      direction={direction}
      duration={duration}
      visible={visible}
      style={stylesheets.dimensiton}
      className={className}
    >
      <Popup
        visible={visible}
        overlay={overlay}
        style={stylesheets.popup}
        overlayStyle={stylesheets.overlay}
        duration={duration}
        position={direction === 'down' ? 'top' : 'bottom'}
      >
        {options.map((option) => {
          const active = option.value === value;
          const styleOption = {
            '--dropdown-menu-option-active-color': activeColor,
          };
          const classNameOption = clsx('van-dropdown-item__option', {
            'van-dropdown-item__option--active': active,
          });

          const title = (
            <View className="van-dropdown-item__title">{option.text}</View>
          );
          const rightIcon = (
            <Select in={active}>
              <Icon
                name="success"
                className="van-dropdown-item__icon"
                color={activeColor}
              />
            </Select>
          );

          return (
            <View
              data-value={option.value}
              key={option.value}
              className={classNameOption}
              style={styleOption as CSSProperties}
              onClick={onOptionClick}
            >
              <Cell
                clickable
                title={title}
                icon={option.icon}
                rightIcon={rightIcon}
              />
            </View>
          );
        })}
      </Popup>
    </DropdownItemDimension>
  );
};

export default withDefaultProps<
  ExogenousDropdownItemProps,
  NeutralDropdownItemProps
>(DefaultDropdownItemProps)(DropdownItem);
