// got from https://github.com/flexdinesh/browser-or-node
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
