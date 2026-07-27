function walk(node, base) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.properties) {
    for (const key of ['src', 'href', 'poster']) {
      const value = node.properties[key];
      if (
        typeof value === 'string' &&
        value.startsWith('/') &&
        !value.startsWith('//') &&
        base !== '/'
      ) {
        node.properties[key] = `${base}${value}`;
      }
    }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, base);
  }
}

export default function rehypeBaseAssets(options = {}) {
  const rawBase = options.base || '/';
  const base = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '');
  return (tree) => walk(tree, base);
}
