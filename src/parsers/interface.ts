import { type SwitchParser } from './switch';

export const COMPLEX_DATA_PROP = '// complex-data-type';
export const ParseFailSymbol = Symbol('parse-fail');

export const enum ParserType {
  JSON = 'JSON',
  URL = 'URL',
  UNKNOWN = 'UNKNOWN',
}

export interface ComplexData {
  [COMPLEX_DATA_PROP]: ParserType;
  value: any;
}

export abstract class Parser<T> {
  abstract type: ParserType;
  abstract switchParser: SwitchParser | null;
  abstract parse(input: string): T | typeof ParseFailSymbol;
  abstract stringify(input: T): string;
}
