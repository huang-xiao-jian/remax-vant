// packages
import React, {
  FunctionComponent,
  CSSProperties,
  useCallback,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import { View, Image as WechatImage } from 'remax/wechat';
// internal
import Icon from '../Icon';
import widthDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
import './Image.css';

// type annotations
type FitMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

// 默认值填充属性
interface NeutralImageProps {
  mode: FitMode;
  radius: string;
  round: boolean;
  lazyLoad: boolean;
  showError: boolean;
  showLoading: boolean;
  showMenuByLongpress: boolean;
  // 加载时渲染组件
  loading: ReactNode;
  // 加载错误渲染组件
  error: ReactNode;
}
// 不包含默认值属性
interface ExogenousImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件
  onClick?: (detail: any) => void;
  onLoad?: (detail: any) => void;
  onError?: (detail: any) => void;
}

interface ImageState {
  loading: boolean;
  error: boolean;
}

interface ImageActions {
  type: 'IMAGE_LOAD_REFRESH' | 'IMAGE_LOAD_SUCCESS' | 'IMAGE_LOAD_FAILURE';
}

type ImageProps = NeutralImageProps & ExogenousImageProps;

// scope
const DefaultImageProps: NeutralImageProps = {
  mode: 'scaleToFill',
  radius: '0px',
  round: false,
  lazyLoad: false,
  showError: true,
  showLoading: true,
  showMenuByLongpress: false,
  loading: <Icon name="photo-o" size="22px" />,
  error: <Icon name="warning-o" size="22px" />,
};

// TODO - mixins: [button, openType]
const Image: FunctionComponent<ImageProps> = (props) => {
  const {
    className,
    src,
    round,
    mode,
    lazyLoad,
    showError,
    error,
    showLoading,
    loading,
    width,
    height,
    radius,
    showMenuByLongpress,
  } = props;
  const { onClick, onLoad, onError } = props;
  const classnames = {
    container: clsx(className, 'van-image', {
      'van-image--round': round,
    }),
  };
  const style: CSSProperties = {
    width,
    height,
    borderRadius: radius,
    overflow: radius && 'hidden',
  };
  const [state, dispatch] = useReducer(
    (states: ImageState, action: ImageActions) => {
      switch (action.type) {
        case 'IMAGE_LOAD_REFRESH':
          return { loading: true, error: false };
        case 'IMAGE_LOAD_SUCCESS':
          return { loading: false, error: false };
        case 'IMAGE_LOAD_FAILURE':
          return { loading: false, error: true };
        default:
          return states;
      }
    },
    {
      loading: false,
      error: false,
    }
  );
  // preserve vant-weapp style
  const handleImageClick = useCallback(
    (event) => {
      // bubble up logical
      if (typeof onClick === 'function') {
        onClick(event.detail);
      }
    },
    [onClick]
  );
  const handleImageLoad = useCallback(
    (event) => {
      // inside logical
      dispatch({
        type: 'IMAGE_LOAD_SUCCESS',
      });
      // bubble up logical
      if (typeof onLoad === 'function') {
        onLoad(event.detail);
      }
    },
    [onLoad]
  );
  const handleImageError = useCallback(
    (event) => {
      // inside logical
      dispatch({
        type: 'IMAGE_LOAD_FAILURE',
      });
      // bubble up logical
      if (typeof onError === 'function') {
        onError(event.detail);
      }
    },
    [onError]
  );

  useEffect(() => {
    // inside logical
    dispatch({
      type: 'IMAGE_LOAD_REFRESH',
    });
  }, [src]);

  // render element
  const children = {
    image: (
      <WechatImage
        className="van-image__img"
        src={src}
        lazyLoad={lazyLoad}
        mode={mode}
        showMenuByLongpress={showMenuByLongpress}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    ),
    loading: state.loading && showLoading && loading && (
      <View className="van-image__loading">{loading}</View>
    ),
    error: state.error && showError && error && (
      <View className="van-image__error">{error}</View>
    ),
  };

  return (
    <View
      style={pickStyle(style)}
      className={classnames.container}
      onClick={handleImageClick}
    >
      {children.image}
      {children.loading}
      {children.error}
    </View>
  );
};

export default widthDefaultProps<ExogenousImageProps, NeutralImageProps>(
  DefaultImageProps
)(Image);
