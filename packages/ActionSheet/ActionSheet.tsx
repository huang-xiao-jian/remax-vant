// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View, Button, Text } from 'remax/wechat';
// internal
import Popup from '../Popup';
import Icon from '../Icon';
import Loading from '../Loading';
import { Select, Switch, Case } from '../tools/Switch';
import withDefaultProps from '../tools/with-default-props-advance';
import pickStyle from '../tools/pick-style';
// self
import { ActionSheetItem } from './ActionSheet.interface';
import './ActionSheet.css';

// 默认值填充属性
interface NeutralActionSheetProps {
  zIndex: number;
  overlay: boolean;
  round: boolean;
  closeOnClickAction: boolean;
  safeAreaInsetBottom: boolean;
}

interface ExogenousActionSheetProps {
  actions?: ActionSheetItem[];
  title?: string;
  description?: string;
  visible: boolean;
  cancelText?: string;
  // 容器类名，用以覆盖内部
  className?: string;
  // 事件绑定
  onClose?: () => void;
  onCancel?: () => void;
  onClickOverlay?: () => void;
  onSelect?: (action: ActionSheetItem) => void;
}

type ActionSheetProps = NeutralActionSheetProps & ExogenousActionSheetProps;

// scope
const DefaultActionSheetProps: NeutralActionSheetProps = {
  zIndex: 100,
  overlay: true,
  round: false,
  closeOnClickAction: true,
  safeAreaInsetBottom: true,
};

const ActionSheet: FunctionComponent<ActionSheetProps> = (props) => {
  const {
    className,
    actions,
    visible,
    round,
    zIndex,
    overlay,
    safeAreaInsetBottom,
    title,
    description,
    cancelText,
    children,
  } = props;
  const { onClose, onCancel, onSelect, onClickOverlay } = props;
  const classnames = {
    container: clsx(className, 'van-action-sheet'),
    title: clsx('van-hairline--bottom', 'van-action-sheet__header'),
  };

  return (
    <Popup
      position="bottom"
      className={classnames.container}
      visible={visible}
      round={round}
      zIndex={zIndex}
      overlay={overlay}
      onClickOverlay={onClickOverlay}
      safeAreaInsetBottom={safeAreaInsetBottom}
    >
      <Select in={!!title}>
        <View className={classnames.title}>
          {title}
          <Icon
            name="close"
            className="van-action-sheet__close"
            onClick={onClose}
          />
        </View>
      </Select>
      <Select in={!!description}>
        <View className="van-action-sheet__description">{description}</View>
      </Select>
      <Select in={Array.isArray(actions)}>
        {actions?.map((action, index) => {
          const disabled = action.disabled || action.loading;
          const style = pickStyle({
            color: action.color,
          });
          const classNameAction = clsx(
            action.className,
            'van-action-sheet__item',
            'van-hairline--top',
            {
              'van-action-sheet__item--disabled': disabled,
            }
          );
          // open type mixin
          const {
            openType,
            onContact,
            onGetPhoneNumber,
            onGetUserInfo,
            onLaunchApp,
            onError,
            onOpenSetting,
          } = action;
          // button mixin
          const {
            lang,
            sessionFrom,
            sendMessageImg,
            sendMessagePath,
            sendMessageTitle,
            appParameter,
            showMessageCard,
          } = action;

          const onSelectWrap = () => {
            if (!disabled) {
              if (typeof onSelect === 'function') {
                onSelect(action);
              }
            }
          };

          return (
            <Button
              hoverClassName="van-action-sheet__item--hover"
              key={action.name}
              data-index={index}
              style={style}
              className={classNameAction}
              onClick={onSelectWrap}
              openType={openType}
              onGetUserInfo={onGetUserInfo}
              onContact={onContact}
              onGetPhoneNumber={onGetPhoneNumber}
              onLaunchApp={onLaunchApp}
              onError={onError}
              onOpenSetting={onOpenSetting}
              sessionFrom={sessionFrom}
              sendMessageTitle={sendMessageTitle}
              sendMessagePath={sendMessagePath}
              sendMessageImg={sendMessageImg}
              lang={lang}
              appParameter={appParameter}
              showMessageCard={showMessageCard}
            >
              <Switch>
                <Case in={action.loading}>
                  <Loading className="van-action-sheet__loading" size="20px" />
                </Case>
                <Case default>
                  <Text>{action.name}</Text>
                  <Select in={!!action.subname}>
                    <Text className="van-action-sheet__subname">
                      {action.subname}
                    </Text>
                  </Select>
                </Case>
              </Switch>
            </Button>
          );
        })}
      </Select>
      {children}
      <Select in={!!cancelText}>
        <View
          className="van-action-sheet__cancel"
          hoverClassName="van-action-sheet__cancel--hover"
          hoverStayTime={70}
          onClick={onCancel}
        >
          {cancelText}
        </View>
      </Select>
    </Popup>
  );
};

export default withDefaultProps<
  ExogenousActionSheetProps,
  NeutralActionSheetProps
>(DefaultActionSheetProps)(ActionSheet);
