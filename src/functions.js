import { transform, baseOptions } from './utils';

export const withParams = pattern => params => Object.keys(params).reduce(
  (path, key) => path.replace(`:${key}`, params[key]),
  pattern,
);

export const getApiPaths = (config, path, nullPath) => transform(config, (acc, value, key) => {
  if (typeof value === 'object' && value !== null) {
    acc[key] = getApiPaths(value, `${path}/${key}`, nullPath);
  } else if (key === nullPath) {
    acc[key] = path;
  } else if (value === true) {
    acc[key] = `${path}/${key}`;
  } else {
    acc[key] = `${path}${value}`;
  }
  return acc;
}, {});

export const getApiRoutes = config => transform(config, (acc, value, key) => {
  if (typeof value === 'object' && value !== null) {
    acc[key] = getApiRoutes(value);
  }

  if (typeof value === 'string') {
    const hasParams = value.includes(':');
    acc[key] = hasParams ? withParams(value) : value;
  }
  return acc;
}, {});

export default options => (pathConfig) => {
  const { basePath, nullPath } = { ...baseOptions, ...options };
  const paths = getApiPaths(pathConfig, basePath, nullPath);
  return getApiRoutes(paths);
};
