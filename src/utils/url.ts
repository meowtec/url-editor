import debounce from 'debounce';
import { compressAndToBase64, fromBase64AndDecompress } from './encode';

const getFromQuery = (prop: string) =>
  new URL(window.location.href).searchParams.get(prop) ?? '';

const getHashContent = () => {
  const { hash } = window.location;
  return hash.length > 1 ? hash.substring(1) : '';
};

const setHashContent = (content: string) => {
  window.history.replaceState({}, '', `#${content}`);
};

export const setDataToUrlDebounced = debounce((data: string) => {
  setHashContent(
    data.length > 0 && data.length < 1024 * 4 ? compressAndToBase64(data) : ''
  );
});

export const getDataFromUrl = () => {
  const hashContent = getHashContent();
  if (hashContent.length > 0) {
    try {
      return fromBase64AndDecompress(hashContent);
    } catch {
      // ignore
    }
  }

  // legacy support
  const url = getFromQuery('url');
  if (url) {
    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.delete('url');
    window.history.replaceState({}, '', pageUrl);
    return url;
  }

  return '';
};
