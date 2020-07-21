/**
 * @description - implement scroll view manage
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { useState } from 'react';
import { useNativeEffect } from 'remax';

type QueryResults = [BoundingClientRectResult[], BoundingClientRectResult];

export function useScrollView(
  id: string,
  scrollable: boolean,
  index: number
): number {
  const [scrollLeft, setScrollLeft] = useState(0);

  // 推荐仅变更 index 数值
  useNativeEffect(() => {
    if (scrollable) {
      const qs = wx.createSelectorQuery();

      // tab 列表
      qs.selectAll(`#${id} .van-tab`).boundingClientRect();
      // tab 容器
      qs.select(`#${id} .van-tabs__nav`).boundingClientRect();

      qs.exec(([tabs, nav]: QueryResults) => {
        const tab = tabs[index];
        const offset = tabs
          .slice(0, index)
          .reduce((prev, curr) => prev + curr.width, 0);
        const left = offset - (nav.width - tab.width) / 2;

        setScrollLeft(left);
      });
    }
  }, [id, scrollable, index]);

  return scrollLeft;
}
