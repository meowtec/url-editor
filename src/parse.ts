interface UrlObject {
  base: string;
  params: [string, string | UrlObject][];
}

export function parse(urlString: string): UrlObject {
  const url = new URL(urlString);
  const urlObject: UrlObject = {
    base:
      url.protocol + (url.hostname ? '//' + url.hostname : '') + url.pathname,
    params: [],
  };

  for (const [key, value] of url.searchParams) {
    let val;
    try {
      val = parse(value);
    } catch {
      val = value;
    }

    urlObject.params.push([key, val]);
  }

  return urlObject;
}

export function stringify(urlObject: UrlObject) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of urlObject.params) {
    searchParams.append(
      key,
      typeof value === 'string' ? value : stringify(value)
    );
  }

  return urlObject.base + '?' + searchParams.toString();
}
