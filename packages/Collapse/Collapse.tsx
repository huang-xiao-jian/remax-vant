// packages
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import { CollapseContext, CollapseContextPayload } from './Collapse.constant';
import withDefaultProps from '../tools/with-default-props-advance';
import './Collapse.css';

// 默认值填充属性
interface NeutralCollapseProps {
  accordion: boolean;
  border: boolean;
}

interface ExogenousCollapseProps {
  // 遵从受控组件规范
  value: string | string[];
  // 事件绑定
  onChange: (value: string | string[]) => void;
  // 容器类名，用以覆盖内部
  className?: string;
}

type CollapseProps = NeutralCollapseProps & ExogenousCollapseProps;

// scope
const DefaultCollapseProps: NeutralCollapseProps = {
  accordion: false,
  border: true,
};

const Collapse: FunctionComponent<CollapseProps> = (props) => {
  const { className, border, accordion, value, children } = props;
  const { onChange } = props;
  const classnames = {
    container: clsx(className, 'van-collapse', {
      'van-hairline--top-bottom': border,
    }),
  };
  const isExpandAction = (name: string) =>
    Array.isArray(value) ? !value.includes(name) : value !== name;
  const dispatch = (name: string) => {
    const expand = isExpandAction(name);

    if (accordion) {
      onChange(expand ? name : '');
    } else {
      // 代码可读性考量
      // eslint-disable-next-line no-lonely-if
      if (expand) {
        let nextValue: string | string[] = '';

        if (Array.isArray(value)) {
          nextValue = value.filter((_name) => _name !== name).concat(name);
        }

        if (value && typeof value === 'string') {
          nextValue = value === name ? [] : [value, name];
        }

        onChange(nextValue);
      } else {
        if (Array.isArray(value)) {
          onChange(value.filter((_name) => _name !== name));
        }

        if (value && typeof value === 'string') {
          onChange(value === name ? [] : [value]);
        }
      }
    }
  };
  const payload: CollapseContextPayload = {
    value,
    dispatch,
  };

  return (
    <CollapseContext.Provider value={payload}>
      <View className={classnames.container}>{children}</View>
    </CollapseContext.Provider>
  );
};

export default withDefaultProps<ExogenousCollapseProps, NeutralCollapseProps>(
  DefaultCollapseProps
)(Collapse);
