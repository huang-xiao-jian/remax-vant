// packages
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { View } from 'remax/wechat';
// internal
import './Panel.css';

// 默认值填充属性
interface ExogenousPanelProps {
  // 容器类名，用以覆盖内部
  className?: string;
}

type PanelProps = ExogenousPanelProps;
// resolve static type mismatch issue
type PanelType = FunctionComponent<PanelProps> & {
  Header: FunctionComponent;
  Content: FunctionComponent;
  Footer: FunctionComponent;
};

const Header: FunctionComponent = ({ children }) => (
  <View className="van-panel__header">{children}</View>
);

const Content: FunctionComponent = ({ children }) => (
  <View className="van-panel__content">{children}</View>
);

const Footer: FunctionComponent = ({ children }) => (
  <View className="van-panel__footer van-hairline--top">{children}</View>
);

const Panel: PanelType = (props) => {
  const { className, children } = props;
  const classnames = {
    container: clsx(className, 'van-panel', 'van-hairline--top-bottom'),
  };

  return <View className={classnames.container}>{children}</View>;
};

Panel.Header = Header;
Panel.Content = Content;
Panel.Footer = Footer;

export default Panel;
