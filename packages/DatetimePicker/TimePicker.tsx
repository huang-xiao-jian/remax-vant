// packages
import React, { FunctionComponent, useMemo } from 'react';
// internal
import Picker from '../Picker';
import PickerColumn from '../PickerColumn';
import withDefaultProps from '../tools/with-default-props-advance';
// self
import {
  NeutralTimePickerProps,
  ExogenousTimePickerProps,
  TimePickerProps,
} from './DatetimePicker.interface';
import { createTimeOptions } from './DatetimePicker.tools';
import { TimePickerColumnType } from './DatetimerPicke.constant';

// scope
const DefaultDatetimePickerProps: NeutralTimePickerProps = {
  // 默认情况直接输出数字
  formatter: (_, value) => `${value}`,
};

const TimePicker: FunctionComponent<TimePickerProps> = (props) => {
  const { formatter, value, onChange } = props;
  const { hours, minutes, seconds } = useMemo(
    () => createTimeOptions(formatter),
    [formatter]
  );
  const handlerFactory = (type: TimePickerColumnType) => (
    bubble: string | number
  ) => {
    onChange({
      [type.toLocaleLowerCase()]: bubble as number,
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  // generate handlers only once
  const handlers = useMemo(
    () => ({
      onHourChange: handlerFactory(TimePickerColumnType.Hour),
      onMinuteChange: handlerFactory(TimePickerColumnType.Minute),
      onSecondChange: handlerFactory(TimePickerColumnType.Second),
    }),
    []
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Picker>
      <PickerColumn
        options={hours}
        value={value.hour}
        onChange={handlers.onHourChange}
      />
      <PickerColumn
        options={minutes}
        value={value.minute}
        onChange={handlers.onMinuteChange}
      />
      <PickerColumn
        options={seconds}
        value={value.second}
        onChange={handlers.onSecondChange}
      />
    </Picker>
  );
};

export default withDefaultProps<
  ExogenousTimePickerProps,
  NeutralTimePickerProps
>(DefaultDatetimePickerProps)(TimePicker);
