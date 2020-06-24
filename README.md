# Remax Vant

使用 Remax 移植 `vant-weapp` 组件库。

## Getting Start

安装依赖

```bash
yarn
```

调试项目

```bash
# 执行调试命令
yarn dev
```

使用小程序开发者工具打开项目下的 `dist` 目录

## 构建

```bash
# 执行构建命令
$ yarn build
```

## 移植进度

### 基础组件

- [x] Button
- [x] Cell
- [x] Icon
- [x] Image
- [x] Layout
- [x] Popup
- [x] Transition - 独立实现，与原版几乎无任何关联

### 表单组件

- [ ] Calendar
- [x] Checkbox
- [ ] DatetimePicker
- [ ] Field
- [x] Picker - 与原版差异巨大，尚未确认是否影响依赖组件使用
- [x] Radio
- [x] Rate
- [ ] Search
- [x] Slider
- [ ] Stepper
- [x] Switch
- [ ] Uploader

### 反馈组件

- [ ] ActionSheet
- [ ] Dialog
- [ ] DropdownMenu
- [x] Loading
- [x] Notify - 与原版实现有差异，参见新文档
- [x] Overlay
- [ ] SwipeCell
- [x] Toast - 与原版实现有差异，参见新文档

### 展示组件

- [ ] Circle
- [ ] Collapse
- [x] Divider
- [ ] NoticeBar
- [x] Panel - 实现有较大差异
- [x] Progress
- [x] Skeleton
- [x] Steps
- [x] Sticky - 暂未支持 `scrollTop` 属性绑定
- [x] Tag
- [x] TreeSelect

### 导航组件

- [x] Grid - 实现有较大差异，待确认是否保持一致
- [x] IndexBar - 暂不支持 `sticky anchor`，后续处理
- [x] Sidebar
- [x] Navbar
- [ ] Tab
- [x] Tabbar

### 业务组件

- [ ] Area
- [x] Card
- [x] SubmitBar
- [x] GoodsAction

## Tips

### 如何新建移植模块？

使用 `remax-vant-cli` 工具包，目前功能受限，新建模块如下：

```bash
# 创建模块
remant create radio;

# 不创建预览界面
remant create radio-group --ignore-page;
```

### 如何处理 `style property` 空值?

使用 `pickStyle` 工具函数处理，推荐使用方式如下：

```typescript
const stylesheets: Record<'container', CSSProperties> = {
  container: pickStyle({
    maxWidth: maxWidth,
    minWidth: minWidth,
  }),
};
```

### 如何处理默认值填充？

类型声明分为如下部分：

```typescript
// 默认值填充属性
interface NeutralSliderProps {}
// 不包含默认值属性
interface ExogenousSliderProps {}

type SliderProps = NeutralSliderProps & ExogenousSliderProps;
```

默认值填充使用 `withDefaultProps` 高阶函数进行处理，示例如下：

```typescript
export default withDefaultProps<ExogenousSliderProps, NeutralSliderProps>(
  DefaultSliderProps
)(Slider);
```

### 如何使用自定义 `class`？

`remax-vant` 使用 `react` 进行重写，不再包含小程序自定义组件样式隔离机制，无需独立暴露 `external classnames`，多数组件直接使用 `className` 传递类名，部分内部 `class hook` 类尚未实现。

### 如何声明 size ？

避免不必要麻烦，`remax-vant` 限定 `size` 指定使用带单位的字符串，切勿使用快捷数字：

```typescript
<Icon name="chat" size="32px" color="#3489fa" />
```

### 如何暴露事件监听函数？

`remax-vant` 不包含小程序特定事件机制，与常规事件暴露相同，回调函数透传 `event`，无需额外包装。

## 待处理

- `id` `business-id` 目测与行为监控有关，后续处理
- `wx://form-field` 如何使用或者如何替换？？？

## remax-vant-cli

- `create dry-run`
