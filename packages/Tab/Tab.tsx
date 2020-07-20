// packages
import React, {
  FunctionComponent,
  useMemo,
  useEffect,
  useContext,
  CSSProperties,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import uuid from '../tools/uuid';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import { TabsContext } from '../Tabs/Tabs.context';
import { TabActionTypes } from '../Tabs/Tabs.redux';
import './Tab.css';

// 默认值填充属性
interface NeutralTabProps {
  disabled: boolean;
}

interface ExogenousTabProps {
  name: string; // 实际负荷
  title: string; // 渲染文本
  dot?: boolean;
  info?: string;
  // 内嵌样式
  style?: CSSProperties;
  // 容器类名，用以覆盖内部
  className?: string;
}

type TabProps = NeutralTabProps & ExogenousTabProps;

// scope
const DefaultTabProps: NeutralTabProps = {
  disabled: false,
};

const Tab: FunctionComponent<TabProps> = (props) => {
  const {
    style,
    className,
    children,
    name,
    title,
    dot,
    info,
    disabled,
  } = props;
  const id = useMemo(() => uuid(), []);
  const classnames = {
    container: clsx(className, 'van-tab__pane-host'),
  };
  const { value, animated, dispatch } = useContext(TabsContext);
  // 转场模式全量渲染
  const visible = value === name || animated;

  useEffect(
    () => {
      dispatch({
        type: TabActionTypes.SettleTab,
        payload: {
          id,
          name,
          title,
          dot,
          info,
          disabled,
        },
      });
    },
    // id, dispatch 固定值，列出仅为处理 eslint react-hooks/exhaustive-deps
    [id, dispatch, name, title, dot, info, disabled]
  );

  return (
    <Select in={visible}>
      <View style={style} className={classnames.container}>
        <View className="van-tab__pane">{children}</View>
      </View>
    </Select>
  );
};

export default withDefaultProps<ExogenousTabProps, NeutralTabProps>(
  DefaultTabProps
)(Tab);
