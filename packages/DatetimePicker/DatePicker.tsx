// packages
import React, { FunctionComponent, useMemo } from 'react';
// internal
import Picker from '../Picker';
import PickerColumn from '../PickerColumn';
import withDefaultProps from '../tools/with-default-props-advance';
// self
import {
  NeutralDatePickerProps,
  ExogenousDatePickerProps,
  DatePickerProps,
} from './DatetimePicker.interface';
import {
  createDateOptions,
  analyzeMonthCount,
  createDayOptions,
} from './DatetimePicker.tools';
import { DatePickerColumnType } from './DatetimerPicke.constant';

// scope
const today = new Date();
const DefaultDatePickerProps: NeutralDatePickerProps = {
  minYear: today.getFullYear() - 10,
  maxYear: today.getFullYear() + 10,
  // 默认情况直接输出数字
  formatter: (_, value) => `${value}`,
};

const DatePicker: FunctionComponent<DatePickerProps> = (props) => {
  const { formatter, minYear, maxYear, value, onChange } = props;
  // 此处有 bug，每月时间并非固定 31 天
  const { years, months } = useMemo(
    () => createDateOptions(minYear, maxYear, formatter),
    [minYear, maxYear, formatter]
  );
  const dayCount = analyzeMonthCount(value.year, value.month);
  const days = useMemo(() => createDayOptions(dayCount, formatter), [
    dayCount,
    formatter,
  ]);
  const handlerFactory = (type: DatePickerColumnType) => (
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
      onYearChange: handlerFactory(DatePickerColumnType.Year),
      onMonthChange: handlerFactory(DatePickerColumnType.Month),
      onDayChange: handlerFactory(DatePickerColumnType.Day),
    }),
    []
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Picker>
      <PickerColumn
        options={years}
        value={value.year}
        onChange={handlers.onYearChange}
      />
      <PickerColumn
        options={months}
        value={value.month}
        onChange={handlers.onMonthChange}
      />
      <PickerColumn
        options={days}
        value={value.day}
        onChange={handlers.onDayChange}
      />
    </Picker>
  );
};

export default withDefaultProps<
  ExogenousDatePickerProps,
  NeutralDatePickerProps
>(DefaultDatePickerProps)(DatePicker);
