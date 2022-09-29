import JSON from 'json5';
import debounce from 'debounce';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CodeEditor from './code';
import { parse, stringify } from './parse';
import Links from './links';
import './app.css';

const getUrlFromSearch = () => {
  const url = new URL(location.href).searchParams.get('url') ?? '';
  try {
    // validate url
    new URL(url);
    return url;
  } catch {
    return '';
  }
};

const setUrlToSearch = debounce((url: string) => {
  const pageUrl = new URL(location.href);
  pageUrl.searchParams.set('url', url);
  history.replaceState(
    { url},
    '',
    pageUrl.href
  );
}, 1000);

const urlToJSONString = (url: string) => JSON.stringify(parse(url), null, '  ');

export default function App() {
  const [url, setUrl] = useState(() => getUrlFromSearch());
  const [code, setCode] = useState(() => urlToJSONString(url));

  const updateCodeFromUrl = (urlStr: string) => {
    try {
      setCode(urlToJSONString(urlStr));
    } catch {}
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    updateCodeFromUrl(value);
  };

  const handleCodeChange = useCallback((code: string) => {
    setCode(code);
    try {
      setUrl(stringify(JSON.parse(code)));
    } catch {}
  }, []);

  useEffect(() => {
    setUrlToSearch(url);
  }, [url]);

  return (
    <div className='app'>
      <input
        value={url}
        className='input'
        placeholder='Input URL here'
        onChange={handleUrlChange}
      />
      <CodeEditor className='editor' value={code} onChange={handleCodeChange} />
      <Links />
    </div>
  );
}
