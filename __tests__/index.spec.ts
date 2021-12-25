import getEnvVar from '../src';


describe('@bolajiolajide/env-utils', () => {
  const OLD_ENV = process.env;
  const NEW_VARS = {
    TEST_STR_VAR: 'sample',
    TEST_ARR_VAR: 'cat,cow,mouse,dog',
    TEST_NUM_VAR: '23',
    TEST_BOOL_VAR: 'true',
    TEST_BOOL_VAR_2: 'something else',
  }

  describe('development environment', () => {
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = {
        ...OLD_ENV,
        ...NEW_VARS,
        NODE_ENV: 'development'
      }; // Make a copy
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test('throws an error if the key does not exist and there\'s no devDefault', (done) => {
      expect(getEnvVar('UNDEFINED_KEY')).toThrow();
    });
  });

  describe('non-development environment', () => {
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = {
        ...OLD_ENV,
        ...NEW_VARS,
        NODE_ENV: 'production'
      }; // Make a copy
    });

    afterAll(() => {
      process.env = OLD_ENV; // Restore old environment
    });

    test('expect true to be true', (done) => {
      expect(true).toBe(true);

      done();
    });
  });
});
