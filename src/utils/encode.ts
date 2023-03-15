import { deflate, inflate } from 'pako';
import { fromUint8Array, toUint8Array } from 'js-base64';

export function compressAndToBase64(text: string) {
  return fromUint8Array(deflate(text));
}

export function fromBase64AndDecompress(text: string) {
  return inflate(toUint8Array(text), { to: 'string' });
}
