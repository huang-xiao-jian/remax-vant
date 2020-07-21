// packages
import React, { FunctionComponent, useReducer, useMemo } from 'react';
import clsx from 'clsx';
import { View, ScrollView } from 'remax/wechat';
// internal
import Sticky from '../Sticky';
import Info from '../Info';
import uuid from '../tools/uuid';
import { useTouchLite } from '../tools/use-touch-lite';
import withDefaultProps from '../tools/with-default-props-advance';
import { Select } from '../tools/Switch';
import { TabsContext, TabsContextPayload } from './Tabs.context';
import { tabsReducer, TabsReducerType } from './Tabs.redux';
import { useLine } from './use-line';
import { useScrollView } from './use-scroll-view';
import * as styles from './Tabs.styles';
import './Tabs.css';

// 默认值填充属性
interface NeutralTabsProps {
  color: string;
  zIndex: number;
  type: 'line' | 'card';
  border: boolean;
  duration: number;
  lineWidth?: string;
  swipeThreshold: number;
  animated: boolean;
  ellipsis: boolean;
  swipeable: boolean;
  lazyRender: boolean;
  sticky: boolean;
  offsetTop: number;
}

interface ExogenousTabsProps {
  // 容器类名，用以覆盖内部
  className?: string;
  titleActiveColor?: string;
  titleInactiveColor?: string;
  // 当前选择值
  value: string;
  // 事件绑定
  onChange: (value: string) => void;
  onDisabled?: (value: string) => void;
}

type TabsProps = NeutralTabsProps & ExogenousTabsProps;

// scope
const DefaultTabsProps: NeutralTabsProps = {
  color: '#ee0a24',
  zIndex: 1,
  type: 'line',
  border: true,
  duration: 300,
  swipeThreshold: 4,
  animated: false,
  ellipsis: true,
  lazyRender: false,
  swipeable: false,
  sticky: false,
  offsetTop: 0,
};

// TODO - classname hook
const Tabs: FunctionComponent<TabsProps> = (props) => {
  const {
    className,
    sticky,
    type,
    zIndex,
    offsetTop,
    swipeThreshold,
    ellipsis,
    duration,
    border,
    color,
    value,
    animated,
    swipeable,
    titleActiveColor,
    titleInactiveColor,
    children,
  } = props;
  const { onChange, onDisabled } = props;

  // 限制选择器查询范围
  const id = useMemo(() => uuid(), []);
  const [state, dispatch] = useReducer<TabsReducerType>(tabsReducer, {
    units: [],
    names: [],
  });
  const payload: TabsContextPayload = {
    value,
    animated,
    dispatch,
  };

  const scrollable = state.units.length > swipeThreshold && !ellipsis;
  const classnames = {
    container: clsx(className, 'van-tabs', `van-tabs--${type}`),
    wrap: clsx('van-tabs__wrap', {
      'van-tabs__wrap--scrollable': scrollable,
      'van-hairline--top-bottom': type === 'line' && border,
    }),
    scroll: clsx('van-tabs__scroll', `van-tabs__scroll--${type}`),
    nav: clsx('van-tabs__nav', `van-tabs__nav--${type}`),
    track: clsx('van-tabs__track', {
      'van-tabs__track--animated': animated,
    }),
  };

  const currentIndex = state.names.indexOf(value);
  const lineStyle = useLine(id, type, duration, color, currentIndex);
  const scrollLeft = useScrollView(id, scrollable, currentIndex);
  const { disc, onTouchStart, onTouchMove, onTouchEnd } = useTouchLite();
  const onTouchEndWrap = (event: TouchEventMini) => {
    // delegate
    onTouchEnd(event);

    if (swipeable) {
      const minSwipeDistance = 50;
      const { direction, deltaX, offsetX } = disc;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && currentIndex !== 0) {
          onChange(state.names[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex !== state.names.length - 1) {
          onChange(state.names[currentIndex + 1]);
        }
      }
    }
  };

  return (
    <TabsContext.Provider value={payload}>
      <View id={id} className={classnames.container}>
        <Sticky disabled={!sticky} zIndex={zIndex} offsetTop={offsetTop}>
          <View className={classnames.wrap}>
            <ScrollView
              scrollX={scrollable}
              scrollLeft={scrollLeft}
              scrollWithAnimation
              className={classnames.scroll}
              style={styles.ofScrollView(color)}
            >
              <View
                className={classnames.nav}
                style={styles.ofNaviView(color, type)}
              >
                <Select in={type === 'line'}>
                  <View className="van-tabs__line" style={lineStyle} />
                </Select>
                {state.units.map((unit) => {
                  const classNameUnit = clsx('van-tab', {
                    'van-ellipsis': ellipsis,
                    // 'van-tab--complete': !ellipsis,
                    'van-tab--disabled': unit.disabled,
                    'van-tab--active': value === unit.name,
                  });
                  const styleUnit = styles.ofUnit(
                    value === unit.name,
                    ellipsis,
                    color,
                    type,
                    unit.disabled,
                    titleActiveColor,
                    titleInactiveColor,
                    swipeThreshold,
                    scrollable
                  );
                  const onClick = () => {
                    if (unit.disabled) {
                      if (typeof onDisabled === 'function') {
                        onDisabled(unit.name);
                      }
                    } else {
                      onChange(unit.name);
                    }
                  };

                  return (
                    <View
                      key={unit.name}
                      className={classNameUnit}
                      style={styleUnit}
                      onClick={onClick}
                    >
                      <View
                        className={clsx({ 'van-ellipsis': ellipsis })}
                        style={unit.titleStyle}
                      >
                        {unit.title}
                        <Info
                          info={unit.info}
                          dot={unit.dot}
                          className="van-tab__title__info"
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Sticky>

        <View
          className="van-tabs__content"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndWrap}
        >
          <View
            style={styles.ofTrack(
              animated,
              currentIndex,
              duration,
              disc.dragging,
              disc.deltaX
            )}
            className={classnames.track}
          >
            {children}
          </View>
        </View>
      </View>
    </TabsContext.Provider>
  );
};

export default withDefaultProps<ExogenousTabsProps, NeutralTabsProps>(
  DefaultTabsProps
)(Tabs);
