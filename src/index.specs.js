import {expect} from 'chai'
import {getEnvVar} from './'

describe('Common Functions for working with \'process.env\'', () => {
  let orgEnv

  beforeEach(() => {
    orgEnv = process.env
  })

  afterEach(() => {
    process.env = orgEnv
  })

  function addMockEnvVar(key, value) {
    process.env = {
      ...process.env,
      [key]: value
    }
  }

  describe('#getEnvVar', () => {
    const testVarKey = 'MOCHA_TEST_VAR_KEY'

    it('should get an environment variable', () => {
      addMockEnvVar(testVarKey, 'some_value')
      expect(getEnvVar(testVarKey)).to.eql('some_value')
    })

    it('should throw if a variable is undefined', () => {
      expect(() => {
        getEnvVar('SOMETHING_NOT_FOUND')
      }).to.throw(/SOMETHING_NOT_FOUND is undefined/)
    })

    describe('when variable is optional', () => {
      const opts = { optional: true }

      it('should not throw', () => {
        expect(() => {
          getEnvVar('SOMETHING_NOT_FOUND', opts)
        }).to.not.throw()
      })

      it('should return undefined', () => {
        expect(getEnvVar('SOMETHING_NOT_FOUND', opts)).to.be.undefined
      })
    })

    describe('when boolean values are enabled', () => {
      const opts = { boolean: true }

      it('should cast value to a boolean', () => {
        addMockEnvVar(testVarKey, 'true')
        const envVar = getEnvVar(testVarKey, opts)
        expect(envVar).to.be.true
      })
    })

    describe('when comma separated lists are enabled', () => {
      const opts = { commaSeparated: true }

      it('should return an array of values', () => {
        addMockEnvVar(testVarKey, 'first,second,third')

        const envVar = getEnvVar(testVarKey, opts)

        expect(envVar).to.be.an('array')
        expect(envVar).to.be.eql(['first', 'second', 'third'])
      })

      it('should trim any values in the array', () => {
        addMockEnvVar(testVarKey, 'first, second, third')

        const envVar = getEnvVar(testVarKey, opts)

        expect(envVar).to.be.an('array')
        expect(envVar).to.be.eql(['first', 'second', 'third'])
      })
    })

    describe('when NODE_ENV is development', () => {
      beforeEach(() => {
        addMockEnvVar('NODE_ENV', 'development')
      })

      it('should use the devDefault fallback', () => {
        expect(getEnvVar(testVarKey, { devDefault: 'fallback'})).to.eql('fallback')
      })
    })
  })
})
