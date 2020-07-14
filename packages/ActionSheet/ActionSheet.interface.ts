import { OpenTypeMixin, ButtonMixin } from '../mixin';

export interface ActionSheetItem extends OpenTypeMixin, ButtonMixin {
  name: string;
  subname?: string;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
