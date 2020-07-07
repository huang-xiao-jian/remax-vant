// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useState,
  useEffect,
} from 'react';
import { useNativeEffect } from 'remax';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './DropdownItem.css';

// 默认值填充属性
interface DropdownItemDimensionProps {
  // 选择器
  id: string;
  // 容器可见标记
  visible: boolean;
  // 透传
  direction: 'up' | 'down';
  duration: number;
  // 容器类名，用以覆盖内部
  className?: string;
  // 覆盖内部样式，此处特定用途，处理 zIndex
  style: CSSProperties;
}

const DropdownItemDimension: FunctionComponent<DropdownItemDimensionProps> = (
  props
) => {
  const {
    id,
    direction,
    duration,
    visible,
    className,
    style,
    children,
  } = props;
  const classnames = {
    container: clsx(
      className,
      'van-dropdown-item',
      `van-dropdown-item--${direction}`
    ),
  };
  const [proxyStyle, setProxyStyle] = useState<CSSProperties>({});
  const bindingStyle = { ...style, ...proxyStyle };

  useEffect(() => {
    if (visible) {
      setProxyStyle((acc) => ({ ...acc, display: 'block' }));

      return () => {};
    }

    const timer = setTimeout(() => {
      setProxyStyle((acc) => ({ ...acc, display: 'none' }));
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration]);

  useNativeEffect(() => {
    wx.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(([rect]: [WechatMiniprogram.BoundingClientRectCallbackResult]) => {
        const { bottom, top } = rect;
        const { windowHeight } = wx.getSystemInfoSync();
        const patch =
          direction === 'down'
            ? { top: `${bottom}px` }
            : { bottom: `${windowHeight - top}px` };

        // popup 定位为 fixed
        setProxyStyle((acc) => ({ ...acc, ...patch }));
      });
  }, []);

  return (
    <View style={bindingStyle} className={classnames.container}>
      {children}
    </View>
  );
};

export default DropdownItemDimension;
