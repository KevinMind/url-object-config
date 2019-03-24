import { withParams } from './functions';

export const transform = (obj, cb, defaultValue) => {
  const result = defaultValue;
  Object.entries(obj).forEach((curr) => {
    const [key, value] = curr;
    cb(result, value, key);
  });
  return result;
};

export const get = (obj, path, defaultValue = undefined) => {
  if (path.includes('.')) {
    const [first, ...restKeys] = path.split('.');
    const nextObj = obj[first];
    if (restKeys.length > 0) {
      return get(nextObj, restKeys.join('.'));
    }
    return nextObj || defaultValue;
  }
  return obj[path] || defaultValue;
};

export const baseOptions = {
  transform: withParams,
  basePath: '',
  nullPath: 'default',
};
