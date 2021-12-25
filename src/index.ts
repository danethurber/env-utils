import type { EnvOptions, EnvValue } from './types';


const trimElements = (element: string) => element.trim();

const getEnvVar = (key: string, options: EnvOptions = {}): EnvValue | EnvValue[] => {
  const fallback = process.env['NODE_ENV'] === 'development' ? options.devDefault : undefined;
  const envValue = process.env[key] === undefined ? fallback : process.env[key];

  const isOptionalAndUndefined = !options.optional && typeof envValue === 'undefined';
  const isUndefined = typeof envValue === 'undefined';
  const isString = typeof envValue === 'string';

  if (isOptionalAndUndefined || isUndefined) {
    throw new Error(`"${key}" is undefined`);
  }

  if (options.isBoolean && isString) {
    return envValue === 'true';
  }

  if (options.commaSeparated && isString) {
    return envValue.split(',').map(trimElements);
  }

  if (options.isNumber && isString) {
    const numericEnvValue = parseInt(envValue, 10);

    if (isNaN(numericEnvValue)) {
      throw new Error(`"${key}" is not a valid number`);
    }

    return numericEnvValue;
  }

  return envValue;
};

export default getEnvVar;
