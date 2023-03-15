import { useCallback, useLayoutEffect, useRef } from 'react';

export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const ref = useRef<T>(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  });

  return useCallback((...args: any[]) => ref.current?.(...args), [ref]) as T;
}
