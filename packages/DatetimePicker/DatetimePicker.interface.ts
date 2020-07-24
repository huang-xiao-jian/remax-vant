// internal
// internal
import { NeutralPickerProps } from '../Picker/Picker.interface';
import {
  TimePickerColumnType,
  DatePickerColumnType,
} from './DatetimerPicke.constant';

/* DatePicker */
export interface DatePickerPayload {
  year: number;
  month: number;
  day: number;
}

export interface DatePickerFormatter {
  (type: DatePickerColumnType, value: number): string;
}

export interface NeutralDatePickerProps {
  minYear: number;
  maxYear: number;
  formatter: DatePickerFormatter;
}

export interface ExogenousDatePickerProps {
  value: DatePickerPayload;
  onChange: (value: Partial<DatePickerPayload>) => void;
}

export type DatePickerProps = NeutralDatePickerProps &
  ExogenousDatePickerProps &
  Partial<NeutralPickerProps>;

/* TimePicker */
export interface TimePickerPayload {
  hour: number;
  minute: number;
  second: number;
}

export interface TimePickerFormatter {
  (type: TimePickerColumnType, value: number): string;
}

// 默认值填充属性
export interface NeutralTimePickerProps {
  formatter: TimePickerFormatter;
}

export interface ExogenousTimePickerProps {
  value: TimePickerPayload;
  onChange: (value: Partial<TimePickerPayload>) => void;
}

export type TimePickerProps = NeutralTimePickerProps &
  ExogenousTimePickerProps &
  Partial<NeutralPickerProps>;
