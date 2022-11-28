module.exports = {
  name: 'contact',
  preset: 'react-native',
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage/libs/contact',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    '../../node_modules/(?!${ng2-tel-input})',
    '../../node_modules/react-test-renderer/cjs/react-test-renderer',
    '../../node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native',
  },
  // transform: {
  //   '^.+\\.svg$': 'jest-svg-transformer',
  // },
};
