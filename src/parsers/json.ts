import { ParseFailSymbol, Parser, ParserType } from './interface';
import { SwitchParser } from './switch';

export class ComplexJSONParser implements Parser<object> {
  type = ParserType.JSON;

  switchParser: SwitchParser | null = null;

  #tryStringifyProperty(value: unknown) {
    return this.switchParser!.stringify(value) ?? value;
  }

  #tryParseProperty(value: unknown) {
    if (typeof value === 'string') {
      return this.switchParser!.parse(value) ?? value;
    }

    return value;
  }

  /**
   * Parse JSON string to object.
   * Only handle with object and array
   * @param input JSON string
   * @returns
   */
  parse(input: string): object | typeof ParseFailSymbol {
    if (!/\s*\{|\[/.test(input)) {
      return ParseFailSymbol;
    }

    try {
      return JSON.parse(input, (_key, value) => this.#tryParseProperty(value));
    } catch {
      return ParseFailSymbol;
    }
  }

  stringify(input: object) {
    return JSON.stringify(
      input,
      (_key, value) => {
        const string = this.#tryStringifyProperty(value);
        return string == null ? value : string;
      },
      2
    );
  }
}
