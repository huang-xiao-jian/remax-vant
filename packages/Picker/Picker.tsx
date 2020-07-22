// packages
import React, {
  FunctionComponent,
  CSSProperties,
  Children,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Loading from '../Loading';
import PickerToolbar from './PickerToolbar';
import { Select } from '../tools/Switch';
import { isGeneticChild } from '../tools/is';
import withDefaultProps from '../tools/with-default-props-advance';
import PickerColumn from '../PickerColumn';
import { PickerContextPayload, PickerContext } from './Picker.context';
import './Picker.css';

// 默认值填充属性
interface NeutralPickerProps {
  loading: boolean;
  showToolbar: boolean;
  toolbarPosition: 'top' | 'bottom';
  // PickerToolbar 配置参数
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  // PickerColumn 配置参数
  itemHeight: number;
  visibleItemCount: number;
}

interface ExogenousPickerProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onCancel?: () => void;
  onConfirm?: () => void;
}

type PickerProps = NeutralPickerProps & ExogenousPickerProps;

const DefaultPickerProps: NeutralPickerProps = {
  showToolbar: false,
  toolbarPosition: 'top',
  loading: false,
  itemHeight: 44,
  title: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  visibleItemCount: 5,
};

const Picker: FunctionComponent<PickerProps> = (props) => {
  const {
    className,
    loading,
    itemHeight,
    visibleItemCount,
    toolbarPosition,
    confirmButtonText,
    cancelButtonText,
    children,
    onCancel,
    onConfirm,
    title,
  } = props;

  // ui bindings
  const payload = useMemo<PickerContextPayload>(
    () => ({
      itemHeight,
      visibleItemCount,
    }),
    [visibleItemCount, itemHeight]
  );
  const classnames = {
    container: clsx(className, 'van-picker'),
  };
  const stylesheets: Record<string, CSSProperties> = {
    columns: {
      height: `${itemHeight * visibleItemCount}px`,
    },
    mask: {
      backgroundSize: `100% ${
        (itemHeight * visibleItemCount - itemHeight) / 2
      }px`,
    },
    frame: { height: `${itemHeight}px` },
  };

  return (
    <View className={classnames.container}>
      <Select in={toolbarPosition === 'top'}>
        <PickerToolbar
          title={title}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </Select>

      <Select in={loading}>
        <View className="van-picker__loading">
          <Loading color="#1989fa" />
        </View>
      </Select>

      <View className="van-picker__columns" style={stylesheets.columns}>
        {/* Picker 不进行任何状态管理职责 */}
        {/* eslint-disable-next-line consistent-return */}
        {Children.map(children, (child) => {
          if (isGeneticChild(child, PickerColumn)) {
            return (
              <PickerContext.Provider value={payload}>
                <View className="van-picker__column">{child}</View>
              </PickerContext.Provider>
            );
          }
        })}
        {/* 背景 repeat 制作非选中项目遮罩效果，干的漂亮 */}
        <View className="van-picker__mask" style={stylesheets.mask} />
        {/* 选择框线 frame */}
        <View
          style={stylesheets.frame}
          className="van-picker__frame van-hairline--top-bottom"
        />
      </View>

      <Select in={toolbarPosition === 'bottom'}>
        <PickerToolbar
          title={title}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousPickerProps, NeutralPickerProps>(
  DefaultPickerProps
)(Picker);
