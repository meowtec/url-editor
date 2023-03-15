import clsx from 'clsx';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import CodeEditor from './code';
import { createParsers } from './parsers';
import Links from './links';
import { COMPLEX_DATA_PROP, ParserType } from './parsers/interface';
import { parseHumanJSON, stringifyHumanJSON } from './utils/json';
import { useCopy } from './hooks/copy';
import './app.scss';
import { getDataFromUrl, setDataToUrlDebounced } from './utils/url';

export default function App() {
  const parsers = useMemo(() => createParsers(), []);
  const [type, setType] = useState<ParserType | null>(null);
  const [input, setInput] = useState('');
  const [json, setJSON] = useState('');

  const updateJsonFromInput = useCallback(
    (str: string) => {
      const data = parsers.switchParser.parse(str);

      if (data) {
        setType(data[COMPLEX_DATA_PROP]);
        setJSON(stringifyHumanJSON(data.value));
      } else {
        setType(ParserType.UNKNOWN);
        setJSON('');
      }
    },
    [parsers.switchParser]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setInput(value);
    updateJsonFromInput(value);
  };

  const handleJsonChange = useCallback(
    (newJson: string) => {
      setJSON(newJson);
      if (!type) return;
      try {
        const data = parseHumanJSON(newJson);
        const value = parsers.switchParser
          .getParserByType(type)
          .stringify(data);
        setInput(value);
      } catch (err) {
        console.error(err);
      }
    },
    [parsers.switchParser, type]
  );

  useEffect(() => {
    setDataToUrlDebounced(input);
  }, [input]);

  useEffect(() => {
    if (type != null) return;

    const urlValue = getDataFromUrl();
    if (urlValue) {
      setInput(urlValue);
      updateJsonFromInput(urlValue);
    }
  }, [type, updateJsonFromInput]);

  const [handleCopy, copied] = useCopy(input);

  return (
    <div className="app">
      <div className={clsx('header', copied && 'copied')}>
        <div className="input-wrapper">
          <textarea
            value={input}
            rows={type === ParserType.JSON ? 5 : 1}
            className="input"
            placeholder="Input or paste URL / JSON here"
            onChange={handleInputChange}
          />
          <div className="input-actions">
            <span className="input-type">{type}</span>
            <button type="button" className="copy-btn" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      {type ? (
        <CodeEditor
          className="editor"
          value={json}
          onChange={handleJsonChange}
        />
      ) : null}
      <Links />
    </div>
  );
}
