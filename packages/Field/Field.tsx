// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View, Input } from 'remax/wechat';
// internal
import Cell from '../Cell';
import Icon from '../Icon';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import {
  NeutralFieldProps,
  ExogenousFieldProps,
  FieldProps,
} from './Field.interface';
import './Field.css';

// scope
const DefaultFieldProps: NeutralFieldProps = {
  type: 'digit',
  fixed: false,
  focus: false,
  disabled: false,
  readonly: false,
  clearable: false,
  password: false,
  titleWidth: '6.2em',
  inputAlign: 'left',
  confirmType: 'done',
  confirmHold: false,
  holdKeyboard: false,
  cursorSpacing: 50,
  adjustPosition: true,
  showConfirmBar: true,
  autoFocus: false,
  disableDefaultPadding: true,
  // Cell Transparent
  required: false,
  border: true,
  clickable: false,
  center: false,
  isLink: false,
  size: 'default',
  cursor: -1,
};

// TODO - 暂不支持 textarea
const Field: FunctionComponent<FieldProps> = (props) => {
  // Cell transparent props
  const {
    size,
    icon,
    title,
    center,
    border,
    isLink,
    required,
    clickable,
    titleWidth,
    arrowDirection,
    rightIcon,
    className,
    style,
  } = props;
  // Input transparent props
  const {
    inputAlign,
    type,
    disabled,
    focus,
    autoFocus,
    cursor,
    placeholder,
    placeholderStyle,
    confirmType,
    confirmHold,
    holdKeyboard,
    cursorSpacing,
    adjustPosition,
    password,
    maxlength,
    selectionStart,
    selectionEnd,
    onInput,
    onFocus,
    onBlur,
    onConfirm,
    onKeyboardHeightChange,
  } = props;
  // rest props
  const {
    button,
    readonly,
    error,
    errorMessage,
    errorMessageAlign,
    value,
    clearable,
    onChange,
  } = props;
  // UI binding

  const classnames = {
    container: clsx('van-field__body', `van-field__body--${type}`),
    input: clsx('van-field__input', `van-field__input--${inputAlign}`, {
      'van-field__input--disabled': disabled,
      'van-field__input--error': error,
    }),
    placeholder: clsx('van-field__placeholder', {
      'van-field__placeholder--error': error,
    }),
    errorMessage: clsx('van-field__error-message', {
      [`van-field__error-message--${errorMessageAlign}`]: errorMessageAlign,
      'van-field__error-message--disabled': disabled,
      'van-field__error-message--error': error,
    }),
  };

  // Input event, 键盘输入时触发，event.detail = {value, cursor, keyCode}，keyCode 为键值，
  const onInputWrap = (event: any) => {
    if (typeof onInput === 'function') {
      onInput(event);
    }

    // 传递输入值
    if (typeof onChange === 'function') {
      onChange(event.detail.value);
    }
  };

  const onClear = () => {
    // 清空输入
    if (typeof onChange === 'function') {
      onChange('');
    }
  };

  const clearVisible = clearable && !readonly;

  return (
    <Cell
      size={size}
      icon={icon}
      rightIcon={rightIcon}
      center={center}
      border={border}
      isLink={isLink}
      required={required}
      clickable={clickable}
      arrowDirection={arrowDirection}
      title={title}
      titleWidth={titleWidth}
      style={style}
      className={clsx(className, 'van-field')}
    >
      <View className={classnames.container}>
        <Input
          type={type}
          focus={focus}
          autoFocus={autoFocus}
          cursor={cursor}
          placeholder={placeholder}
          placeholderStyle={placeholderStyle}
          placeholderClassName={classnames.placeholder}
          confirmType={confirmType}
          confirmHold={confirmHold}
          holdKeyboard={holdKeyboard}
          cursorSpacing={cursorSpacing}
          adjustPosition={adjustPosition}
          password={password}
          maxlength={maxlength}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          disabled={disabled || readonly}
          className={classnames.input}
          value={value}
          onInput={onInputWrap}
          onFocus={onFocus}
          onBlur={onBlur}
          onConfirm={onConfirm}
          onKeyboardHeightChange={onKeyboardHeightChange}
        />

        {/* Clear Icon */}
        <Select in={clearVisible}>
          <View
            className="van-field__clear-root van-field__icon-root"
            onClick={onClear}
          >
            <Icon name="clear" />
          </View>
        </Select>

        {/* Button */}
        <View className="van-field__button">{button}</View>
      </View>

      {/* Error */}
      <View className={classnames.errorMessage}>{errorMessage}</View>
    </Cell>
  );
};

export default withDefaultProps<ExogenousFieldProps, NeutralFieldProps>(
  DefaultFieldProps
)(Field);
