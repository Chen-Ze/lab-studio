module.exports = {
  displayName: 'front-ui-experiment-tab-experiment',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/front/ui/experiment-tab/experiment',
};
