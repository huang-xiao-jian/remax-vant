/**
 * @description - generate available options for picker
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
// internal
import { between } from '../tools/between';
import { CandidateOption } from '../PickerColumn/PickerColumn.interface';
import {
  TimePickerFormatter,
  DatePickerFormatter,
} from './DatetimePicker.interface';
import {
  TimePickerColumnType,
  DatePickerColumnType,
} from './DatetimerPicke.constant';

export interface TimeOptions {
  hours: CandidateOption[];
  minutes: CandidateOption[];
  seconds: CandidateOption[];
}

export interface DateOptions {
  years: CandidateOption[];
  months: CandidateOption[];
}

export function createTimeOptions(formatter: TimePickerFormatter): TimeOptions {
  return {
    hours: between(0, 12).map((item) => ({
      value: item,
      title: formatter(TimePickerColumnType.Hour, item),
    })),
    minutes: between(0, 30).map((item) => ({
      value: item,
      title: formatter(TimePickerColumnType.Minute, item),
    })),
    seconds: between(0, 30).map((item) => ({
      value: item,
      title: formatter(TimePickerColumnType.Second, item),
    })),
  };
}

export function createDateOptions(
  minYear: number,
  maxYear: number,
  formatter: DatePickerFormatter
): DateOptions {
  return {
    years: between(minYear, maxYear).map((item) => ({
      value: item,
      title: formatter(DatePickerColumnType.Year, item),
    })),
    months: between(1, 12).map((item) => ({
      value: item,
      title: formatter(DatePickerColumnType.Month, item),
    })),
  };
}

export function analyzeMonthCount(year: number, month: number): number {
  const m31 = [1, 3, 5, 7, 8, 10, 12];
  const m30 = [4, 6, 9, 11];

  if (m31.includes(month)) {
    return 31;
  }

  if (m30.includes(month)) {
    return 30;
  }

  return (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0) ? 29 : 28;
}

export function createDayOptions(
  count: number,
  formatter: DatePickerFormatter
): CandidateOption[] {
  return between(1, count).map((item) => ({
    value: item,
    title: formatter(DatePickerColumnType.Day, item),
  }));
}
