import { useRef, useState } from 'react';

export function useDelaySwitch(delay: number) {
  const [on, setOn] = useState(false);
  const timerRef = useRef<number>();

  const turnOn = () => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
    }
    setOn(true);
    timerRef.current = setTimeout(() => setOn(false), delay);
  };

  return [on, turnOn] as const;
}
