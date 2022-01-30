import { useCallback, useLayoutEffect, useRef } from 'react';

export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const ref = useRef<T>(callback);

  /**
   * 这里使用 useLayoutEffect 而不是 useEffect，是因为 useLayoutEffect 比 useEffect 更早
   * const a = useRefCallback(() => doWith(xxx)) // 假如这里面是 useEffect
   * useLayoutEffect(() => {
   *   if (bar) a(); // 这里会先执行，导致 doWith(xxx) 的 xxx 是旧的
   * })
   */
  useLayoutEffect(() => {
    ref.current = callback;
  });

  return useCallback((...args: any[]) => ref.current?.(...args), [ref]) as T;
}
