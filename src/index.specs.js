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

    it('should have an optional fallback', () => {
      expect(getEnvVar(testVarKey, 'fallback')).to.eql('fallback')
    })

    describe('when boolean values are enabled', () => {
      const opts = { boolean: true }

      it('should cast value to a boolean', () => {
        addMockEnvVar(testVarKey, 'true')
        const envVar = getEnvVar(testVarKey, null, opts)
        expect(envVar).to.be.true
      })
    })

    describe('when comma seperated lists are enabled', () => {
      const opts = { commaSeperated: true }

      it('should return an array of values', () => {
        addMockEnvVar(testVarKey, 'first,second,third')

        const envVar = getEnvVar(testVarKey, null, opts)

        expect(envVar).to.be.an('array')
        expect(envVar).to.be.eql(['first', 'second', 'third'])
      })
    })
  })
})
