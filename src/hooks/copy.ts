import { useDelaySwitch } from './delay-switch';

export function useCopy(text: string) {
  const [copied, setCopied] = useDelaySwitch(1000);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => setCopied());
  };

  return [handleCopy, copied] as const;
}
