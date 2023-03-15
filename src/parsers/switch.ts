import {
  ComplexData,
  COMPLEX_DATA_PROP,
  ParseFailSymbol,
  Parser,
  ParserType,
} from './interface';

const { hasOwnProperty } = Object.prototype;

export class SwitchParser {
  #parsers: Parser<unknown>[] = [];

  set parsers(parsers: Parser<unknown>[]) {
    this.#parsers = parsers;
    parsers.forEach((parser) => {
      parser.switchParser = this;
    });
  }

  isComplexData(value: unknown): value is ComplexData {
    return !!value && hasOwnProperty.call(value, COMPLEX_DATA_PROP);
  }

  getParserByType(type: ParserType) {
    return (
      this.#parsers.find((parser) => parser.type === type) ??
      this.#parsers.find((parser) => parser.type === ParserType.JSON)!
    );
  }

  parse(input: string): ComplexData | null {
    for (const parser of this.#parsers) {
      const result = parser.parse(input);
      if (result !== ParseFailSymbol) {
        return {
          [COMPLEX_DATA_PROP]: parser.type,
          value: result,
        };
      }
    }

    return null;
  }

  stringify(input: unknown): string | null {
    if (!this.isComplexData(input)) {
      return null;
    }

    const parser = this.getParserByType(input[COMPLEX_DATA_PROP]);

    return parser.stringify(input.value);
  }
}
