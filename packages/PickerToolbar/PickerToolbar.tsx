// packages
import React, { FunctionComponent } from 'react';
import { View } from 'remax/wechat';
// internal
import { Select } from '../tools/Switch';

interface PickerToolbarProps {
  // toolbar title
  title?: string;
  // 文字描述
  confirmButtonText: string;
  cancelButtonText: string;
  // 事件绑定
  onCancel?: () => void;
  onConfirm?: () => void;
}

const PickerToolbar: FunctionComponent<PickerToolbarProps> = (props) => {
  const {
    cancelButtonText,
    confirmButtonText,
    title,
    onCancel,
    onConfirm,
  } = props;

  return (
    <View className="van-picker__toolbar van-hairline--top-bottom">
      <View
        className="van-picker__cancel"
        hoverClassName="van-picker__cancel--hover"
        hoverStayTime={70}
        onClick={onCancel}
      >
        {cancelButtonText}
      </View>

      <Select in={!!title}>
        <View className="van-picker__title van-ellipsis">{title}</View>
      </Select>

      <View
        className="van-picker__confirm"
        hoverClassName="van-picker__confirm--hover"
        hoverStayTime={70}
        onClick={onConfirm}
      >
        {confirmButtonText}
      </View>
    </View>
  );
};

export default PickerToolbar;
