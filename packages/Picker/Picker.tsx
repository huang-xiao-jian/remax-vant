// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useRef,
  useReducer,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import Loading from '../Loading';
import PickerColumn, { CandidatePlayer } from '../PickerColumn';
import { Select } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import { PickerReducerAbstract, PickerActionTypes, reducer } from './redux';
import './Picker.css';

// 默认值填充属性
interface NeutralPickerProps {
  showToolbar: boolean;
  toolbarPosition: 'top' | 'bottom';
  loading: boolean;
  itemHeight: number;
  confirmButtonText: string;
  cancelButtonText: string;
  visibleItemCount: number;
}

interface CandidateColumn {
  key: string;
  initialIndex: number;
  candidates: CandidatePlayer[];
}

interface CandidateColumnWrap extends CandidateColumn {
  onChange: (index: number) => void;
}

interface ExogenousPickerProps {
  // 容器类名，用以覆盖内部
  className?: string;
  // toolbar title
  title?: string;
  // 注意逻辑管理
  columns: CandidateColumn[];
  // 事件绑定
  onCancel?: (event: any) => void;
  onConfirm?: (event: any) => void;
}

type PickerProps = NeutralPickerProps & ExogenousPickerProps;
type PickerToolbarProps = Pick<
  PickerProps,
  'confirmButtonText' | 'cancelButtonText' | 'title' | 'onConfirm' | 'onCancel'
>;

const DefaultPickerProps: NeutralPickerProps = {
  showToolbar: false,
  toolbarPosition: 'top',
  loading: false,
  itemHeight: 44,
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  visibleItemCount: 5,
};

const PickerToobar: FunctionComponent<PickerToolbarProps> = (props) => {
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
        data-type="cancel"
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
        data-type="confirm"
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

const Picker: FunctionComponent<PickerProps> = (props) => {
  const {
    className,
    loading,
    itemHeight,
    columns: _columns,
    visibleItemCount,
    toolbarPosition,
    confirmButtonText,
    cancelButtonText,
    onCancel,
    onConfirm,
    title,
  } = props;

  // ui bindings
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
  // derivation
  // 剔除 state 中非延续 key
  const ref = useRef<string[]>([]);
  const [state, dispatch] = useReducer<PickerReducerAbstract>(reducer, {});
  const columns = useMemo(() => {
    // drop unnecessary fields
    const prevKeys = ref.current;
    const currentKeys = _columns.map((column) => column.key);
    const diffKeys = prevKeys.filter((key) => !currentKeys.includes(key));

    // 存档
    ref.current = currentKeys;

    // 注销字段
    dispatch({
      type: PickerActionTypes.DROP,
      payload: diffKeys,
    });

    // handle columns change
    _columns.forEach((column) => {
      dispatch({
        type: PickerActionTypes.REGISTER,
        payload: {
          key: column.key,
          value: column.initialIndex || 0,
        },
      });
    });

    return _columns.map<CandidateColumnWrap>((column) => ({
      ...column,
      onChange(index: number) {
        dispatch({
          type: PickerActionTypes.MUTATION,
          payload: {
            key: column.key,
            value: index,
          },
        });
      },
    }));
  }, [_columns]);

  // 事件回调函数预处理，内部状态传出
  const bubleup = () =>
    columns.map((column) => ({
      index: state[column.key],
      value: column.candidates[state[column.key]],
    }));
  const onConfirmWrap = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(bubleup());
    }
  };
  const onCancelWrap = () => {
    if (typeof onCancel === 'function') {
      onCancel(bubleup());
    }
  };

  return (
    <View className={classnames.container}>
      <Select in={toolbarPosition === 'top'}>
        <PickerToobar
          title={title}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onConfirm={onConfirmWrap}
          onCancel={onCancelWrap}
        />
      </Select>

      <Select in={loading}>
        <View className="van-picker__loading">
          <Loading color="#1989fa" />
        </View>
      </Select>

      <View className="van-picker__columns" style={stylesheets.columns}>
        {columns.map((column) => (
          // eslint-disable-next-line react/no-array-index-key
          <View className="van-picker__column" key={column.key}>
            <PickerColumn
              visibleItemCount={visibleItemCount}
              itemHeight={itemHeight}
              candidates={column.candidates}
              activeIndex={state[column.key]}
              onChange={column.onChange}
            />
          </View>
        ))}
        {/* 背景 repeat 制作非选中项目遮罩效果，干的漂亮 */}
        <View className="van-picker__mask" style={stylesheets.mask} />
        {/* 选择框线 frame */}
        <View
          className="van-picker__frame van-hairline--top-bottom"
          style={stylesheets.frame}
        />
      </View>

      <Select in={toolbarPosition === 'bottom'}>
        <PickerToobar
          title={title}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onConfirm={onConfirmWrap}
          onCancel={onCancelWrap}
        />
      </Select>
    </View>
  );
};

export default withDefaultProps<ExogenousPickerProps, NeutralPickerProps>(
  DefaultPickerProps
)(Picker);
