module.exports = {
  displayName: 'front-feature-experiment-tab-detailed-renderers',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/front/feature/experiment-tab/detailed-renderers',
};
