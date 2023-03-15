import JSON from 'json5';

export function parseHumanJSON(json: string): unknown {
  return JSON.parse(json);
}

export function stringifyHumanJSON(data: unknown) {
  return JSON.stringify(data, null, '  ');
}
