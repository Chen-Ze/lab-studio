module.exports = {
  displayName: 'front-feature-experiment-tab-routine-renderer',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/front/feature/experiment-tab/routine-renderer',
};
