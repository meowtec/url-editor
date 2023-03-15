import { ParseFailSymbol, Parser, ParserType } from './interface';

interface UrlObject {
  base: string;
  params: [string, string | UrlObject][];
  hash?: string;
}

function tryNewUrl(url: string) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export class UrlParser implements Parser<UrlObject> {
  type = ParserType.URL;

  switchParser = null;

  parse(urlString: string) {
    const url = tryNewUrl(urlString);

    if (!url) {
      return ParseFailSymbol;
    }

    const urlObject: UrlObject = {
      base: url.protocol + (url.host ? `//${url.host}` : '') + url.pathname,
      params: [],
      hash: url.hash ? url.hash : undefined,
    };

    for (const [key, value] of url.searchParams) {
      const val = this.parse(value);

      urlObject.params.push([key, val === ParseFailSymbol ? value : val]);
    }

    return urlObject;
  }

  stringify(urlObject: UrlObject) {
    const url = new URL(urlObject.base);

    for (const [key, value] of urlObject.params ?? []) {
      url.searchParams.append(
        key,
        typeof value === 'string' ? value : this.stringify(value)
      );
    }

    url.hash = urlObject.hash ?? '';

    return url.href;
  }
}
