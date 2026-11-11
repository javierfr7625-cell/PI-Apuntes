export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let clean = pathname;
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length) || '/';
  }
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}
