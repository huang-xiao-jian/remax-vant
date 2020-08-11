// packages
import React, { FunctionComponent, useContext } from 'react';
// internal
// PickerColumn 必须处于 PickerContext 之下
import { PickerContext } from '../Picker/Picker.context';
import {
  PickerColumnProps,
  PickerColumnNativeEvent,
} from './PickerColumn.interface';
import './PickerColumn.css';

// native
import PickerColumnNative from '../../native/picker-column/picker-column';

const PickerColumn: FunctionComponent<PickerColumnProps> = (props) => {
  const { options, value, onChange } = props;
  const { visibleItemCount, itemHeight } = useContext(PickerContext);
  const onNativeChange = (event: PickerColumnNativeEvent) => {
    onChange(event.detail.value);
  };

  return (
    <PickerColumnNative
      itemHeight={itemHeight}
      visibleItemCount={visibleItemCount}
      options={options}
      value={value}
      bindchange={onNativeChange}
    />
  );
};

export default PickerColumn;
