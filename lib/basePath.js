export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path) {
  return `${basePath}${path}`;
}
