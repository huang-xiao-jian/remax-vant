/**
 * @description - deferred promise
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

interface DeferreMedium<T> {
  promise: Promise<T>;
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

function Deferred<T>(): DeferreMedium<T> {
  const medium: Partial<DeferreMedium<T>> = {};

  medium.promise = new Promise((resolve, reject) => {
    medium.resolve = resolve;
    medium.reject = reject;
  });

  return medium as DeferreMedium<T>;
}

export default Deferred;
