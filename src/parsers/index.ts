import { UrlParser } from './url';
import { ComplexJSONParser } from './json';
import { SwitchParser } from './switch';

export { ComplexJSONParser };
export { UrlParser };

export function createParsers() {
  const urlParser = new UrlParser();
  const jsonParser = new ComplexJSONParser();
  const switchParser = new SwitchParser();

  switchParser.parsers = [jsonParser, urlParser];

  return {
    switchParser,
    urlParser,
    jsonParser,
  };
}
