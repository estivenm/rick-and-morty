const moduleFileExtensions = ['js', 'jsx']
const transform = { '^.+\\.(js|jsx)$': 'babel-jest' }
const moduleNameMapper = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '^@root(.*)$': '<rootDir>/src$1',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  '^@services/(.*)$': '<rootDir>/src/api/$1',
  '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  '^@redux/(.*)$': '<rootDir>/src/redux/$1',
  '^@mocks/(.*)$': '<rootDir>/src/mocks/$1'
}
const testMatch = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[jt]s?(x)'
]
const testEnvironment = 'jsdom'
const setupFilesAfterEnv = ['@testing-library/jest-dom/extend-expect']
export default {
  moduleFileExtensions,
  transform,
  moduleNameMapper,
  testMatch,
  testEnvironment,
  setupFilesAfterEnv
}
