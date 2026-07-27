const rawBase = import.meta.env.BASE_URL || '/';
export const basePath = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

export function href(path = '/') {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}` || '/';
}

export function assetHref(path?: string) {
  if (!path) return '';
  return href(path);
}
