/* eslint-disable import/prefer-default-export */
//
import {
  DialogProps,
  DialogManagerAlertOptions,
  DefaultDialogManagerOptions,
} from './Dialog.constant';

type Subscriber = (options: DialogProps) => void;

class DialogManager {
  public options: DialogProps;

  private queue: Subscriber[];

  constructor(options: DialogProps) {
    this.options = options;
    this.queue = [];
  }

  private pipe(options: Partial<DialogProps>) {
    if (this.queue.length === 0) {
      throw new Error('DialogProvider required');
    }

    this.options = { ...this.options, ...options };
    this.queue.forEach((callback) => {
      callback(this.options);
    });
  }

  // 预设选项管理
  setDefaultOptions(options: Partial<DialogProps>) {
    this.options = { ...this.options, ...options };
  }

  resetDefaultOptions() {
    this.options = { ...DefaultDialogManagerOptions };
  }

  // 半自动模式
  alert(options: Partial<DialogManagerAlertOptions>) {
    const { asyncClose, closeOnClickOverlay, ...rest } = options;

    return new Promise((resolve, reject) => {
      this.pipe({
        ...rest,
        visible: true,
        onConfirm: () => {
          // close dialog within auto mode
          if (!asyncClose) {
            this.close();
          }
          // fullfil promise
          resolve();
        },
        onCancel: () => {
          // close dialog within auto mode
          if (!asyncClose) {
            this.close();
          }
          // fullfil promise
          reject();
        },
        onClickOverlay: () => {
          if (closeOnClickOverlay) {
            // close dialog within auto mode
            if (!asyncClose) {
              this.close();
            }
            // fullfil promise
            reject();
          }
        },
      });
    });
  }

  // 全手动模式
  any(options: Partial<DialogProps>) {
    this.pipe(options);
  }

  close() {
    // 关闭在前，重置在后
    this.queue.forEach((callback) => {
      callback({ ...this.options, visible: false });
    });

    // 重置内部参数
    this.options = { ...DefaultDialogManagerOptions };
  }

  subscribe(callback: Subscriber) {
    this.queue.push(callback);

    // 释放订阅
    return () => this.queue.splice(this.queue.indexOf(callback), 1);
  }
}

export const Dialog = new DialogManager(DefaultDialogManagerOptions);
