// package
import React, { useEffect, useState, FunctionComponent } from 'react';
// self
import DialogBox from './DialogBox';
import { Dialog } from './DialogManager';
import { DialogProps } from './Dialog.constant';

// 目前仅支持单个 toast
export const DialogProvider: FunctionComponent = () => {
  const [options, setOptions] = useState<DialogProps>(Dialog.options);

  useEffect(() => {
    const unsubscribe = Dialog.subscribe((_options) => {
      setOptions(_options);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <DialogBox {...options} />
  );
};
