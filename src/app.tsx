import { ChangeEvent, useCallback, useState } from 'react';
import CodeEditor from './code';
import './app.css';
import { parse, stringify } from './parse';

export default function App() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    try {
      setCode(JSON.stringify(parse(value), null, '  '));
    } catch {}
  };

  const handleCodeChange = useCallback((code: string) => {
    setCode(code);
    try {
      setUrl(stringify(JSON.parse(code)));
    } catch {}
  }, []);

  return (
    <div className="app">
      <input
        value={url}
        className="input"
        placeholder="输入待解析 URL"
        onChange={handleUrlChange}
      />
      <CodeEditor className="editor" value={code} onChange={handleCodeChange} />
    </div>
  );
}
